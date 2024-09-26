import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  GovernanceState,
  Question,
} from "./types-Question";

type GovernanceQuestionProps = {
  governanceState: GovernanceState;
  dispatchGovernance: React.Dispatch<{
    type: "UPDATE_ANSWER";
    section: keyof GovernanceState;
    id: number;
    answer: boolean;
  }>;
};

const GovernanceQuestion: React.FC<GovernanceQuestionProps> = ({
  governanceState,
  dispatchGovernance,
}) => {
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
