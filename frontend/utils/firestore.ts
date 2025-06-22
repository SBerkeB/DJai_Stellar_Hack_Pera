import { getFirestore, collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";

import type { WhitelistEntry } from "@/types";
import { db, whitelistCollection } from "../clients/firestore"; 


export const addToWhitelist = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Check if email already exists
      const existingEntry = await checkEmailExists(email)
      if (existingEntry) {
        return {
          success: false,
          message: "Email is already on the whitelist",
        }
      }

      // Add new entry
      const whitelistEntry: Omit<WhitelistEntry, "timestamp"> & { timestamp: Timestamp } = {
        email: email.toLowerCase().trim(),
        timestamp: Timestamp.now(),
        dateAdded: new Date(),
        musicExperience: "beginner", // Default value, can be changed based on your logic
        artificialIntelligenceExperience: "beginner", // Default value, can be changed based on
      }

      await addDoc(whitelistCollection, whitelistEntry)

      return {
        success: true,
        message: "Successfully added to whitelist!",
      }
    } catch (error) {
      console.error("Error adding to whitelist:", error)
      return {
        success: false,
        message: "Failed to add to whitelist. Please try again.",
      }
    }
  }

  // Check if email already exists in whitelist
export const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const q = query(whitelistCollection, where("email", "==", email.toLowerCase().trim()))
      const querySnapshot = await getDocs(q)
      return !querySnapshot.empty
    } catch (error) {
      console.error("Error checking email:", error)
      return false
    }
  }