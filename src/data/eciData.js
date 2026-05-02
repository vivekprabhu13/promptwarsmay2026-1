export const eciData = {
  scenarios: [
    {
      id: "first_time_voter",
      category: "Registration",
      name: "First-Time Voter Registration",
      description: "Applying for inclusion in the Electoral Roll for the first time.",
      applicable_form: "Form 6",
      eligibility: "Indian citizen, 18 years or above on one of the qualifying dates.",
      qualifying_dates: ["January 1", "April 1", "July 1", "October 1"],
      required_documents: [
        "Age proof (Birth certificate, 10th/12th certificate, Passport, PAN Card, Driving License, Aadhaar)",
        "Address proof (Water/Electricity/Gas bill, Aadhaar, Current passbook, Passport, Registered Lease/Sale Deed)",
        "Passport size photograph"
      ],
      process_note: "Having an EPIC (Voter ID) is a necessary but insufficient condition; you must verify your name in the Electoral Roll via electoralsearch.eci.gov.in.",
      helpline: "1950"
    },
    {
      id: "nri_voter",
      category: "Registration",
      name: "NRI Voter Registration",
      description: "Overseas Indian Electors registration.",
      applicable_form: "Form 6A",
      eligibility: "Indian citizen staying abroad who has not acquired citizenship of any other country, 18+ years.",
      qualifying_dates: ["January 1", "April 1", "July 1", "October 1"],
      required_documents: [
        "Passport copy (front and back pages with photo and address)",
        "Valid visa endorsement",
        "Recent passport size photograph"
      ],
      process_note: "Having an EPIC is a necessary but insufficient condition; you must verify your name in the Electoral Roll via electoralsearch.eci.gov.in.",
      helpline: "1950"
    },
    {
      id: "recently_moved_shifting",
      category: "Modification",
      name: "Shifting of Residence",
      description: "Shifting residence within or outside the constituency.",
      applicable_form: "Form 8",
      required_documents: [
        "New Address proof (Water/Electricity/Gas bill, Aadhaar, Current passbook, Passport, Registered Lease/Sale Deed)",
        "Old EPIC card (if available)"
      ],
      process_note: "Having an EPIC (Voter ID) is a necessary but insufficient condition; you must verify your name in the Electoral Roll via electoralsearch.eci.gov.in after shifting.",
      helpline: "1950"
    },
    {
      id: "correction_entries",
      category: "Modification",
      name: "Correction of Entries",
      description: "Correction of name, age/DOB, gender, photo, relative's name, address, or EPIC number.",
      applicable_form: "Form 8",
      required_documents: [
        "Document proof supporting the correction (e.g., Aadhaar, PAN, 10th certificate for name/age)",
        "New photograph (if photo is to be changed)"
      ],
      helpline: "1950"
    },
    {
      id: "lost_card",
      category: "Modification",
      name: "Lost or Damaged Card / Issue of Replacement EPIC",
      description: "Requesting a replacement EPIC without any corrections.",
      applicable_form: "Form 8",
      required_documents: [
        "Copy of FIR/Police report (if lost)",
        "Mutilated/damaged card (if damaged)"
      ],
      helpline: "1950"
    },
    {
      id: "pwd_marking",
      category: "Modification",
      name: "Marking as Person with Disability (PwD)",
      description: "Request to be marked as PwD in the electoral roll for priority services and home voting.",
      applicable_form: "Form 8",
      required_documents: [
        "Disability certificate (optional but recommended)"
      ],
      helpline: "1950"
    },
    {
      id: "deletion_objection",
      category: "Deletion/Objection",
      name: "Deletion or Objection",
      description: "Request to delete a name or object to a proposed inclusion due to death, under age, absent, or already enrolled.",
      applicable_form: "Form 7",
      required_documents: [
        "Death certificate (if applicable)",
        "Details of the person being objected to"
      ],
      helpline: "1950"
    },
    {
      id: "polling_day_logistics",
      category: "Voting Logistics",
      name: "Voting at Polling Station",
      description: "Information regarding the voting process, identifying the polling station, and the usage of EVMs.",
      applicable_form: "None",
      requirements: [
        "EPIC or other approved photo ID (Passport, Driving License, PAN card, etc.)",
        "Name must be present in the Electoral Roll (voter slip is useful but not mandatory)"
      ],
      process_note: "Having an EPIC is a necessary but insufficient condition; you must verify your name in the Electoral Roll via electoralsearch.eci.gov.in.",
      helpline: "1950"
    }
  ]
};
