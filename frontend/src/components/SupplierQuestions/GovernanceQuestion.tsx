import React, { useReducer } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Type for the questions in each category
type Question = {
  id: number;
  question: string;
  answer: boolean | null;
};

// Define the reducer action types
type ActionType = {
  type: "UPDATE_ANSWER";
  section: keyof GovernanceState;
  id: number;
  answer: boolean;
};

// Governance state type
type GovernanceState = {
  supplyChainManagement: Question[];
  dataPrivacySecurityManagement: Question[];
};

// Define the questions for each section under the Governance category
const initialGovernanceQuestions: GovernanceState = {
  supplyChainManagement: [
    {
      id: 1,
      question:
        "Does the company work with and select suppliers that hold the same values as it claims to hold?",
      answer: null,
    },
    {
      id: 2,
      question:
        "Are ESG criteria included in the selection and monitoring of key suppliers?",
      answer: null,
    },
    {
      id: 3,
      question:
        "If suppliers are in emerging markets with high social, human labour, environmental risks, are these suppliers incorporated in the company's ESG risk assessments and ESG activities?",
      answer: null,
    },
    {
      id: 4,
      question:
        "Does the company have a responsible purchasing policy or code of ethics/conduct for suppliers?",
      answer: null,
    },
    {
      id: 5,
      question:
        "Does the company have a process in place to conduct anti-bribery, anti-corruption due diligence on new suppliers, contractors etc.?",
      answer: null,
    },
    {
      id: 6,
      question:
        "Do all suppliers abide by the 8 Fundamental Conventions of the International Labour Organization (ILO)?",
      answer: null,
    },
    {
      id: 7,
      question:
        "The company is unaware of any potential disruption to the supply of chemical/hazardous substances used in the production process due to regulatory phase-out e.g. REACH regulation.",
      answer: null,
    },
    {
      id: 8,
      question:
        "Does the company conduct supply chain risk assessments that include procurement, suppliers, and logistics?",
      answer: null,
    },
  ],
  dataPrivacySecurityManagement: [
    {
      id: 1,
      question:
        "Does the company have and adhere to policies which set out clear commitments and targets to improve data protection, privacy, and security?",
      answer: null,
    },
    {
      id: 2,
      question:
        "Do the company's data protection, privacy and security policies have executive and/or board-level commitment, support, and endorsement?",
      answer: null,
    },
    {
      id: 3,
      question:
        "Are the company's data protection, privacy and security policies regularly reviewed and updated accordingly?",
      answer: null,
    },
    {
      id: 4,
      question:
        "Does the company have a functional data protection, privacy and security management system e.g. ISO 27001?",
      answer: null,
    },
    {
      id: 5,
      question:
        "Has the data protection, privacy and security management system been externally certified and if so to what standard e.g. ISO 27001?",
      answer: null,
    },
    {
      id: 6,
      question:
        "The company is unaware of any breaches in cyber security within the last three years.",
      answer: null,
    },
    {
      id: 7,
      question:
        "The company is unaware of any substantiated complaints regarding breaches of customer privacy or loss of customer data in the last three years.",
      answer: null,
    },
  ],
};

// Reducer for managing governance questions state
const governanceReducer = (
  state: GovernanceState,
  action: ActionType
): GovernanceState => {
  switch (action.type) {
    case "UPDATE_ANSWER":
      return {
        ...state,
        [action.section]: state[action.section].map((q) =>
          q.id === action.id ? { ...q, answer: action.answer } : q
        ),
      };
    default:
      return state;
  }
};

const GovernanceQuestion = () => {
  // useReducer hook to manage governance questions state
  const [governanceState, dispatchGovernance] = useReducer<
    React.Reducer<GovernanceState, ActionType>
  >(governanceReducer, initialGovernanceQuestions);

  // Handler function to update answer for each question
  const handleAnswerChange = (
    section: keyof GovernanceState,
    id: number,
    answer: boolean
  ) => {
    dispatchGovernance({ type: "UPDATE_ANSWER", section, id, answer });
  };

  return (
    <div>
      {/* Supply Chain Management Section */}
      <h3 className="text-lg font-bold my-4">Supply Chain Management</h3>
      <Table>
        <TableBody>
          {governanceState.supplyChainManagement.map((q: Question) => (
            <TableRow key={q.id}>
              <TableCell>{q.question}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant={q.answer === true ? "default" : "outline"}
                    onClick={() =>
                      handleAnswerChange("supplyChainManagement", q.id, true)
                    }
                  >
                    True
                  </Button>
                  <Button
                    variant={q.answer === false ? "default" : "outline"}
                    onClick={() =>
                      handleAnswerChange("supplyChainManagement", q.id, false)
                    }
                  >
                    False
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Data Privacy, Security & Management Section */}
      <h3 className="text-lg font-bold my-4">
        Data Privacy, Security & Management
      </h3>
      <Table>
        <TableBody>
          {governanceState.dataPrivacySecurityManagement.map((q: Question) => (
            <TableRow key={q.id}>
              <TableCell>{q.question}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant={q.answer === true ? "default" : "outline"}
                    onClick={() =>
                      handleAnswerChange(
                        "dataPrivacySecurityManagement",
                        q.id,
                        true
                      )
                    }
                  >
                    True
                  </Button>
                  <Button
                    variant={q.answer === false ? "default" : "outline"}
                    onClick={() =>
                      handleAnswerChange(
                        "dataPrivacySecurityManagement",
                        q.id,
                        false
                      )
                    }
                  >
                    False
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GovernanceQuestion;
