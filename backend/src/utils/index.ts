import { getTags } from "./get-tag.util";

import TagModel from "./tag.model";
import checkNewsExistence from "./check-for-existence/check-news.util";
import delay from "./delay.util";
import stripNonNumeric from "./strip-non-numeric.util";
import checkForTag from "./string-ops/check-for-tags.util";
import stripNumericandPunctuation from "./string-ops/strip-punctuation.util";
import createDateString from "./string-ops/date-string.util";
import getYesterdayDate from "./date-ops/get-yesterday.util";
import stripSpace from "./string-ops/strip-space.util";
import calculatePercentageDifference from "./numerical-utils/percentage-difference.util";
import onlyNumbers from "./string-ops/sole-numbers.util";
import classifyDifference from "./numerical-utils/difference-classification.util";

export {
    getTags,
    checkNewsExistence,
    delay,
    stripNonNumeric,
    checkForTag,
    stripNumericandPunctuation,
    createDateString,
    getYesterdayDate,
    stripSpace,
    calculatePercentageDifference,
    onlyNumbers,
    classifyDifference,
    
    TagModel
}