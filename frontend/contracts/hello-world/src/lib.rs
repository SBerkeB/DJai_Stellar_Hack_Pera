#![no_std]

use soroban_sdk::{
    contract, contractimpl, contractmeta, panic_with_error, token, Address, BytesN, Env, String,
};
use types::*;

contractmeta!(key = "title", val = "DJai Clients");
contractmeta!(
    key = "desc",
    val = "A smart contract database for DJai users. Just like in the olden days of the internet."
);

// Make sure the provided string is not empty.
fn check_string_not_empty(env: &Env, sus_string: &String) {
    if sus_string.is_empty() {
        panic_with_error!(env, Error::InvalidUser);
    }
}

// Read a message from persistent storage.
fn get_user(env: &Env, user_id: u32) -> User {
    if !env
        .storage()
        .persistent()
        .has(&DataKey::User(user_id))
    {
        panic_with_error!(env, Error::NoSuchUser);
    }

    let user: User = env
        .storage()
        .persistent()
        .get(&DataKey::User(user_id))
        .unwrap();
    return user;
}

// Write a message to persistent storage.
fn save_user(env: &Env, user: User) -> u32 {
    let mut num_users = env
        .storage()
        .instance()
        .get(&DataKey::UserCount)
        .unwrap_or(0 as u32);
    num_users += 1;

    env.storage()
        .persistent()
        .set(&DataKey::User(num_users), &user);
    env.storage()
        .instance()
        .set(&DataKey::UserCount, &num_users);

    return num_users;
}

#[contract]
pub struct DJaiUsers;

/// A guestbook smart contract, reminiscent of the [internet
/// guestbooks](https://en.wikipedia.org/wiki/Guestbook) from the olden days.
#[contractimpl]
impl DJaiUsers {
    /// Initializes the guestbook with a warm welcome message for prospective
    /// signers to read.
    ///
    /// # Arguments
    ///
    /// * `admin` - The address which will be the owner and administrator of the
    ///   guestbook.
    /// * `title` - The title or subject of the welcome message.
    /// * `text` - The body or contents of the welcome message.
    ///
    /// # Panics
    ///
    /// * If the `title` argument is empty or missing.
    /// * If the `text` argument is empty or missing.
    pub fn __constructor(
        env: Env,
        admin: Address,
        apikey: String,
    ) -> Result<(), Error> {
        check_string_not_empty(&env, &apikey);

        env.storage().instance().set(&DataKey::Admin, &admin);

        let first_user = User {
            author: admin,
            ledger: env.ledger().sequence(),
            apikey,
        };

        save_user(&env, first_user);
        Ok(())
    }

    /// Upgrade the contract's Wasm bytecode.
    ///
    /// # Arguments
    ///
    /// * `new_wasm_hash` - Hash identifier for the bytecode that should be
    ///   henceforth used by this contract. The bytecode must already be
    ///   installed and present on-chain.
    ///
    /// # Panics
    ///
    /// * If the Wasm bytecode is not already installed on-chain.
    pub fn upgrade(env: Env, new_wasm_hash: BytesN<32>) -> Result<(), Error> {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        env.deployer().update_current_contract_wasm(new_wasm_hash);
        Ok(())
    }

    /// Write a message to the guestbook.
    ///
    /// # Arguments
    ///
    /// * `author` - The sender of the message.
    /// * `title` - The title or subject of the guestbook message.
    /// * `text` - The body or contents of the guestbook message.
    ///
    /// # Panics
    ///
    /// * If the `title` argument is empty or missing.
    /// * If the `text` argument is empty or missing.
    pub fn write_user(
        env: Env,
        author: Address,
        apikey: String,
    ) -> Result<u32, Error> {
        check_string_not_empty(&env, &apikey);
        author.require_auth();

        let new_user = User {
            author,
            ledger: env.ledger().sequence(),
            apikey
        };

        let user_id = save_user(&env, new_user);
        return Ok(user_id);
    }

    /// Edit a specified message in the guestbook.
    ///
    /// # Arguments
    ///
    /// * `message_id` - The ID number of the message to edit.
    /// * `title` - The title or subject of the guestbook message.
    /// * `text` - The body or contents of the guestbook message.
    ///
    /// # Panics
    ///
    /// * If both the `title` AND `text` arguments are empty or missing.
    /// * If there is no authorization from the original message author.
    pub fn edit_user(
        env: Env,
        user_id: u32,
        apikey: String,
    ) -> Result<(), Error> {
        if apikey.is_empty() {
            check_string_not_empty(&env, &apikey);
        }

        let mut user = get_user(&env, user_id);
        user.author.require_auth();

        let edited_apikey = if apikey.is_empty() {
            user.apikey
        } else {
            apikey
        };
        
        user.apikey = edited_apikey;
        user.ledger = env.ledger().sequence();

        env.storage()
            .persistent()
            .set(&DataKey::User(user_id), &user);
        return Ok(());
    }

    /// Read a specified message from the guestbook.
    ///
    /// # Arguments
    ///
    /// * `message_id` - The ID number of the message to retrieve.
    ///
    /// # Panics
    ///
    /// * If the message ID is not associated with a message.
    pub fn read_user(env: Env, user_id: u32) -> Result<User, Error> {
        let user = get_user(&env, user_id);
        Ok(user)
    }

    /// Read the latest message to be sent to the guestbook.
    pub fn read_latest(env: Env) -> Result<User, Error> {
        let latest_id = env
            .storage()
            .instance()
            .get(&DataKey::UserCount)
            .unwrap();
        let latest_user = get_user(&env, latest_id);
        Ok(latest_user)
    }

    /// Claim any donations that have been made to the guestbook contract.
    ///
    /// # Panics
    ///
    /// * If the contract is not holding any donations balance.
    pub fn claim_donations(env: Env, token: Address) -> Result<i128, Error> {
        let token_client = token::TokenClient::new(&env, &token);
        let contract_balance = token_client.balance(&env.current_contract_address());

        if contract_balance == 0 {
            panic_with_error!(&env, Error::NoDonations);
        }

        let admin_address: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        token_client.transfer(
            &env.current_contract_address(),
            &admin_address,
            &contract_balance,
        );

        Ok(contract_balance)
    }
}

mod test;
mod types;