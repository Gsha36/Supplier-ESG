import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Question, SocialState } from "./types-Question";

type SocialQuestionProps = {
  socialState: SocialState;
  dispatchSocial: React.Dispatch<{
    type: "UPDATE_ANSWER";
    section: keyof SocialState;
    id: number;
    answer: boolean;
  }>;
};

const SocialQuestion: React.FC<SocialQuestionProps> = ({
  socialState,
  dispatchSocial,
}) => {
  const handleAnswerChange = (
    section: keyof SocialState,
    id: number,
    answer: boolean
  ) => {
    dispatchSocial({ type: "UPDATE_ANSWER", section, id, answer });
  };

  return (
    <div>
      {/* Worker Health & Safety */}
      <h3 className="text-lg font-bold my-4">Worker Health & Safety</h3>
      <Table>
        <TableBody>
          {socialState.workerHealthSafety.map((q: Question) => (
            <TableRow key={q.id}>
              <TableCell>{q.question}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant={q.answer === true ? "default" : "outline"}
                    onClick={() =>
                      handleAnswerChange("workerHealthSafety", q.id, true)
                    }
                  >
                    True
                  </Button>
                  <Button
                    variant={q.answer === false ? "default" : "outline"}
                    onClick={() =>
                      handleAnswerChange("workerHealthSafety", q.id, false)
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

      {/* Human Rights & Labour Practices */}
      <h3 className="text-lg font-bold my-4">
        Human Rights & Labour Practices
      </h3>
      <Table>
        <TableBody>
          {socialState.humanRightsLabourPractices.map((q: Question) => (
            <TableRow key={q.id}>
              <TableCell>{q.question}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant={q.answer === true ? "default" : "outline"}
                    onClick={() =>
                      handleAnswerChange(
                        "humanRightsLabourPractices",
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
                        "humanRightsLabourPractices",
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

      {/* Regulatory Compliance - Social */}
      <h3 className="text-lg font-bold my-4">Regulatory Compliance - Social</h3>
      <Table>
        <TableBody>
          {socialState.regulatoryComplianceSocial.map((q: Question) => (
            <TableRow key={q.id}>
              <TableCell>{q.question}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant={q.answer === true ? "default" : "outline"}
                    onClick={() =>
                      handleAnswerChange(
                        "regulatoryComplianceSocial",
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
                        "regulatoryComplianceSocial",
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

      {/* Community Involvement */}
      <h3 className="text-lg font-bold my-4">Community Involvement</h3>
      <Table>
        <TableBody>
          {socialState.communityInvolvement.map((q: Question) => (
            <TableRow key={q.id}>
              <TableCell>{q.question}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant={q.answer === true ? "default" : "outline"}
                    onClick={() =>
                      handleAnswerChange("communityInvolvement", q.id, true)
                    }
                  >
                    True
                  </Button>
                  <Button
                    variant={q.answer === false ? "default" : "outline"}
                    onClick={() =>
                      handleAnswerChange("communityInvolvement", q.id, false)
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

      {/* Consumer Safety & Product Safety */}
      <h3 className="text-lg font-bold my-4">
        Consumer Safety & Product Safety
      </h3>
      <Table>
        <TableBody>
          {socialState.consumerSafetyProductSafety.map((q: Question) => (
            <TableRow key={q.id}>
              <TableCell>{q.question}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant={q.answer === true ? "default" : "outline"}
                    onClick={() =>
                      handleAnswerChange(
                        "consumerSafetyProductSafety",
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
                        "consumerSafetyProductSafety",
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

export default SocialQuestion;
