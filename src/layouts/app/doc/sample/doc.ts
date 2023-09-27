import {DocType} from "../types" 
const data = {
  "title": "AFFIDAVIT FOR LOST DRIVING LICENSE",
  "type": "AFFIDAVIT FOR LOST DRIVING LICENSE",
  "sections": [
    {
      "title": "Before The Notary Public",
      "editable":false,

      "content": [
        {
          "variables": "Notary Public Address",
          "defaultValue": "[Complete Address of Notary Public]",
          "value": "", "classNames": [], "styles": {}
        }
      ]
    },
    {
      "title": "Affidavit",
      "editable":false,
      "content": [
        {
          "variables": "Full Name",
          "defaultValue": "[Your Full Name]",
          "value": "", "classNames": [], "styles": {}
        },
        {
          "variables": "Age",
          "defaultValue": "[Your Age]",
          "value": "", "classNames": [], "styles": {}
        },
        {
          "variables": "Father's Name",
          "defaultValue": "[Father's Name]",
          "value": "", "classNames": [], "styles": {}
        },
        {
          "variables": "Full Address",
          "defaultValue": "[Your Full Address]",
          "value": "", "classNames": [], "styles": {}
        }
      ]
    },
    {
      "title": "Affirmation",
      "editable":false,

      "content": [
        {
          "variables": "Deponent Introduction",
          "defaultValue": "I am the deponent and have filed the accompanying application for the issuance of a duplicate driving license, and I am fully conversant with the facts, hence competent to swear this affidavit.",
          "value": "", "classNames": [], "styles": {}
        },
        {
          "variables": "License Details",
          "defaultValue": "I was issued driving license No. [Original License Number] dated [Date of Original License] by this authority, to drive MLV/LV with/without gears.",
          "value": "", "classNames": [], "styles": {}
        },
        {
          "variables": "Loss or Theft Details",
          "defaultValue": "My driving license No. [Original License Number] has been lost/stolen on [Date of Loss/Theft], for which I have lodged FIR at [Name of Police Station], vide FIR No. [FIR Number] dated [Date of FIR] under Section [Relevant Section]. A copy of the FIR is enclosed herewith.",
          "value": "", "classNames": [], "styles": {}
        },
        {
          "variables": "No Court Deposits",
          "defaultValue": "I have not deposited the said license with any court or anywhere, and my license has not been canceled. I have not been convicted of any offense by any court.",
          "value": "", "classNames": [], "styles": {}
        },
        {
          "variables": "No Charge Sheet",
          "defaultValue": "No charge sheet has been filed against me for any offense under the Motor Vehicles Act or Rules made thereunder or any other law in force.",
          "value": "", "classNames": [], "styles": {}
        },
        {
          "variables": "No Disqualifying Diseases",
          "defaultValue": "I do not suffer from any of the diseases disqualifying me to hold the driving license.",
          "value": "", "classNames": [], "styles": {}
        },
        {
          "variables": "License Recovery",
          "defaultValue": "If the original license is found, I shall deposit the same with the Office of the Regional Transport Officer.",
          "value": "", "classNames": [], "styles": {}
        },
        {
          "variables": "Duplicate License Request",
          "defaultValue": "In view of the above, it is necessary that a duplicate driving license may be issued to me.",
          "value": "", "classNames": [], "styles": {}
        }
      ]
    },
    {
      "title": "Verification",
      "editable": false,
      "content": [
        {
          "variables": "Verification Date",
          "defaultValue": "[Date]",
          "value": "", "classNames": ["text-right"], "styles": {}
        },
        {
          "variables": "Verification Month",
          "defaultValue": "[Month]",
          "value": "", "classNames": ["text-right"], "styles": {}
        },
        {
          "variables": "Verification Year",
          "defaultValue": "[Year]",
          "value": "", "classNames": ["text-right"], "styles": {}
        },
        {
          "variables": "Verification Statement",
          "defaultValue": "Verified on this [Date] day of [Month] in the year [Year] that the contents of the above affidavit are true and correct to my knowledge, and nothing material has been concealed therefrom, and no part of it is false.",
          "value": "", "classNames": ["text-right"], "styles": {}
        }
      ]
    },

  ],
  "format": {
    "orientation": "portrait",
    "margins": {
      "top": "1 inch",
      "bottom": "1 inch",
      "left": "1 inch",
      "right": "1 inch"
    },
    "header": {
      "alignment": "center",
      "content": ["AFFIDAVIT FOR LOST DRIVING LICENSE"]
    },
    "footer": {
      "alignment": "center",
      "content": ["Page {page_number} of {total_pages}"]
    }
  }
} as unknown as DocType;
  
export default data;