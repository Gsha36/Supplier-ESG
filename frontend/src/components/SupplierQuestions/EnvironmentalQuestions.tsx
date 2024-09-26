import React, { useReducer } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import SocialQuestion from "./SocialQuestion";
import GovernanceQuestion from "./GovernanceQuestion";
import { useToast } from "@/hooks/use-toast"; // Assuming you're using a custom toast hook
// import { toast } from "sonner";
import {
  Question,
  EnvironmentalState,
  initialEnvironmentalQuestions,
  SocialState,
  initialSocialQuestions,
  GovernanceState,
  initialGovernanceQuestions,
} from "./types-Question";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

// Define the reducer action types for each category
type EnvironmentalActionType = {
  type: "UPDATE_ANSWER";
  section: keyof EnvironmentalState;
  id: number;
  answer: boolean;
};

type GovernanceActionType = {
  type: "UPDATE_ANSWER";
  section: keyof GovernanceState;
  id: number;
  answer: boolean;
};

type SocialActionType = {
  type: "UPDATE_ANSWER";
  section: keyof SocialState;
  id: number;
  answer: boolean;
};

// Reducers for managing each state
const environmentalReducer = (
  state: EnvironmentalState,
  action: EnvironmentalActionType
): EnvironmentalState => {
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

const governanceReducer = (
  state: GovernanceState,
  action: GovernanceActionType
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

const socialReducer = (
  state: SocialState,
  action: SocialActionType
): SocialState => {
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

const EnvironmentalQuestions = () => {
  const [environmentalState, dispatchEnvironmental] = useReducer<
    React.Reducer<EnvironmentalState, EnvironmentalActionType>
  >(environmentalReducer, initialEnvironmentalQuestions);

  const [governanceState, dispatchGovernance] = useReducer<
    React.Reducer<GovernanceState, GovernanceActionType>
  >(governanceReducer, initialGovernanceQuestions);

  const [socialState, dispatchSocial] = useReducer<
    React.Reducer<SocialState, SocialActionType>
  >(socialReducer, initialSocialQuestions);
  const { user } = useAuth();
  const { toast } = useToast();

  const checkAllQuestionsAnswered = () => {
    const allAnswered = (questions: Question[]) =>
      questions.every((q) => q.answer !== null);

    return (
      allAnswered(environmentalState.environmentalManagement) &&
      allAnswered(environmentalState.climateChange) &&
      allAnswered(environmentalState.airPollution) &&
      allAnswered(environmentalState.hazardousMaterialManagement) &&
      allAnswered(environmentalState.naturalResourceManagement) &&
      allAnswered(environmentalState.wasteManagement) &&
      allAnswered(environmentalState.regulatoryCompliance) &&
      allAnswered(environmentalState.pollutionPrevention) &&
      allAnswered(governanceState.supplyChainManagement) &&
      allAnswered(governanceState.dataPrivacySecurityManagement) &&
      allAnswered(socialState.workerHealthSafety) &&
      allAnswered(socialState.humanRightsLabourPractices) &&
      allAnswered(socialState.regulatoryComplianceSocial) &&
      allAnswered(socialState.consumerSafetyProductSafety) &&
      allAnswered(socialState.communityInvolvement)
    );
  };

  const handleSubmit = async () => {
    // if (!checkAllQuestionsAnswered()) {
    //   toast.error(
    //     "Please fill all the questions from Environmental, Social, and Governance sections."
    //   );
    //   return;
    // }

    // Combine the states to send to the backend
    const dataToSend = {
      environmental: environmentalState,
      governance: governanceState,
      social: socialState,
    };

    // Setting the username and timePeriod
    const username = user?.username; // Assuming user object is available
    const timePeriod = Date.now(); // Set current time as timePeriod

    try {
      // Send the data to the backend using axios
      const response = await axios.post(
        "/api/v1/supplier/addSupplierQuestion",
        {
          dataToSend, // The combined states
          username, // Username from user object
          timePeriod, // Current time
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`, // Include access token in the Authorization header
          },
          withCredentials: true, // Include credentials (cookies) if needed
        }
      );

      // Success notification
      toast({
        title: "Success",
        description: "Questions submitted successfully!",
        variant: "default",
      });
      console.log("response", response);
    } catch (error) {
      // Error notification
      console.log("error", error);
       toast({
         title: "Failure",
         description: "Failed to submit the questions. Please try again.",
         variant: "destructive",
       });
    }
  };

  const handleAnswerChange = (
    section: keyof EnvironmentalState,
    id: number,
    answer: boolean
  ) => {
    dispatchEnvironmental({ type: "UPDATE_ANSWER", section, id, answer });
  };

  return (
    <div>
      <Tabs defaultValue="environment" className="w-full">
        <TabsList>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
        </TabsList>

        {/* Environment Tab */}
        <TabsContent value="environment">
          {/* Environmental Management Section */}
          <h3 className="text-lg font-bold my-4">Environmental Management</h3>
          <Table>
            <TableBody>
              {environmentalState.environmentalManagement.map((q: Question) => (
                <TableRow key={q.id}>
                  <TableCell>{q.question}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant={q.answer === true ? "default" : "outline"}
                        onClick={() =>
                          handleAnswerChange(
                            "environmentalManagement",
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
                            "environmentalManagement",
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

          {/* Climate Change Section */}
          <h3 className="text-lg font-bold my-4">Climate Change</h3>
          <Table>
            <TableBody>
              {environmentalState.climateChange.map((q: Question) => (
                <TableRow key={q.id}>
                  <TableCell>{q.question}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant={q.answer === true ? "default" : "outline"}
                        onClick={() =>
                          handleAnswerChange("climateChange", q.id, true)
                        }
                      >
                        True
                      </Button>
                      <Button
                        variant={q.answer === false ? "default" : "outline"}
                        onClick={() =>
                          handleAnswerChange("climateChange", q.id, false)
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

          {/* Air Pollution Section */}
          <h3 className="text-lg font-bold my-4">Air Pollution</h3>
          <Table>
            <TableBody>
              {environmentalState.airPollution.map((q: Question) => (
                <TableRow key={q.id}>
                  <TableCell>{q.question}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant={q.answer === true ? "default" : "outline"}
                        onClick={() =>
                          handleAnswerChange("airPollution", q.id, true)
                        }
                      >
                        True
                      </Button>
                      <Button
                        variant={q.answer === false ? "default" : "outline"}
                        onClick={() =>
                          handleAnswerChange("airPollution", q.id, false)
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

          {/* Hazardous Material Management Section */}
          <h3 className="text-lg font-bold my-4">
            Hazardous & Toxic Material Management
          </h3>
          <Table>
            <TableBody>
              {environmentalState.hazardousMaterialManagement.map(
                (q: Question) => (
                  <TableRow key={q.id}>
                    <TableCell>{q.question}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant={q.answer === true ? "default" : "outline"}
                          onClick={() =>
                            handleAnswerChange(
                              "hazardousMaterialManagement",
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
                              "hazardousMaterialManagement",
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
                )
              )}
            </TableBody>
          </Table>

          {/* Natural Resource Management Section */}
          <h3 className="text-lg font-bold my-4">
            Natural Resource Management & Use
          </h3>
          <Table>
            <TableBody>
              {environmentalState.naturalResourceManagement.map(
                (q: Question) => (
                  <TableRow key={q.id}>
                    <TableCell>{q.question}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant={q.answer === true ? "default" : "outline"}
                          onClick={() =>
                            handleAnswerChange(
                              "naturalResourceManagement",
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
                              "naturalResourceManagement",
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
                )
              )}
            </TableBody>
          </Table>

          {/* Waste Management Section */}
          <h3 className="text-lg font-bold my-4">Waste Management</h3>
          <Table>
            <TableBody>
              {environmentalState.wasteManagement.map((q: Question) => (
                <TableRow key={q.id}>
                  <TableCell>{q.question}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant={q.answer === true ? "default" : "outline"}
                        onClick={() =>
                          handleAnswerChange("wasteManagement", q.id, true)
                        }
                      >
                        True
                      </Button>
                      <Button
                        variant={q.answer === false ? "default" : "outline"}
                        onClick={() =>
                          handleAnswerChange("wasteManagement", q.id, false)
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

          {/* Regulatory Compliance Section */}
          <h3 className="text-lg font-bold my-4">Regulatory Compliance</h3>
          <Table>
            <TableBody>
              {environmentalState.regulatoryCompliance.map((q: Question) => (
                <TableRow key={q.id}>
                  <TableCell>{q.question}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant={q.answer === true ? "default" : "outline"}
                        onClick={() =>
                          handleAnswerChange("regulatoryCompliance", q.id, true)
                        }
                      >
                        True
                      </Button>
                      <Button
                        variant={q.answer === false ? "default" : "outline"}
                        onClick={() =>
                          handleAnswerChange(
                            "regulatoryCompliance",
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

          {/* Pollution Prevention Section */}
          <h3 className="text-lg font-bold my-4">
            Pollution Prevention & Cleaner Production
          </h3>
          <Table>
            <TableBody>
              {environmentalState.pollutionPrevention.map((q: Question) => (
                <TableRow key={q.id}>
                  <TableCell>{q.question}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant={q.answer === true ? "default" : "outline"}
                        onClick={() =>
                          handleAnswerChange("pollutionPrevention", q.id, true)
                        }
                      >
                        True
                      </Button>
                      <Button
                        variant={q.answer === false ? "default" : "outline"}
                        onClick={() =>
                          handleAnswerChange("pollutionPrevention", q.id, false)
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
        </TabsContent>

        {/* Social Tab */}
        <TabsContent value="social">
          <SocialQuestion
            socialState={socialState}
            dispatchSocial={dispatchSocial}
          />
        </TabsContent>

        {/* Governance Tab */}
        <TabsContent value="governance">
          <GovernanceQuestion
            governanceState={governanceState}
            dispatchGovernance={dispatchGovernance}
          />
        </TabsContent>
      </Tabs>
      <Button
        onClick={handleSubmit}
        className="mt-4"
        disabled={!checkAllQuestionsAnswered()}
      >
        Submit
      </Button>
    </div>
  );
};

export default EnvironmentalQuestions;
