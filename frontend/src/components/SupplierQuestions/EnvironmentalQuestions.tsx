import React, { useReducer } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import SocialQuestion from './SocialQuestion';
import GovernanceQuestion from './GovernanceQuestion';


// Type for the questions in each category
type Question = {
  id: number;
  question: string;
  answer: boolean | null;
};

// Define the reducer action types
type ActionType = {
  type: "UPDATE_ANSWER";
  section: keyof EnvironmentalState;
  id: number;
  answer: boolean;
};

type EnvironmentalState = {
  environmentalManagement: Question[];
  climateChange: Question[];
  airPollution: Question[];
  hazardousMaterialManagement: Question[];
  naturalResourceManagement: Question[];
  wasteManagement: Question[];
  regulatoryCompliance: Question[];
  pollutionPrevention: Question[];
};

// Define the questions for each section under the Environmental category
const initialEnvironmentalQuestions: EnvironmentalState = {
  environmentalManagement: [
    {
      id: 1,
      question:
        "Does the company have and adhere to an environmental policy which sets out clear commitments and targets to improve the company’s environmental footprint?",
      answer: null,
    },
    {
      id: 2,
      question:
        "Does the company's environmental policy have executive and/or board-level commitment, support, and endorsement?",
      answer: null,
    },
    {
      id: 3,
      question:
        "Is the company's environmental policy regularly reviewed and updated accordingly?",
      answer: null,
    },
    {
      id: 4,
      question:
        "Does the company have a functional environmental management system (EMS)?",
      answer: null,
    },
    {
      id: 5,
      question:
        "Has the EMS been externally certified and if so to what standard e.g. ISO 14001?",
      answer: null,
    },
    {
      id: 6,
      question:
        "Does the company provide employees and senior management with environmental induction/training where necessary?",
      answer: null,
    },
    {
      id: 7,
      question:
        "Has the company implemented any significant projects/initiatives to improve environmental performance/standards/compliance?",
      answer: null,
    },
    {
      id: 8,
      question:
        "Does the company conduct environmental risk and opportunity assessments of their activities?",
      answer: null,
    },
    {
      id: 9,
      question:
        "Does the company have plans in place to respond to/manage any environmental and safety incidents such as oil/chemical spills, gas leak/explosive atmospheres and other environmental nuisances?",
      answer: null,
    },
    {
      id: 10,
      question:
        "If the company is subject to seismic or other natural hazards at any of its locations, are emergency preparedness plans in place to effectively deal with such events?",
      answer: null,
    },
  ],
  climateChange: [
    {
      id: 1,
      question:
        "Does the environmental policy cover climate change issues that could be relevant to the company?",
      answer: null,
    },
    {
      id: 2,
      question:
        "Has the company conducted a baseline assessment of its carbon/GHG footprint?",
      answer: null,
    },
    {
      id: 3,
      question:
        "Does the company regularly monitor GHG emissions (inclusive of non directly generated e.g. outsourced production & logistics, raw materials from suppliers, etc.)?",
      answer: null,
    },
    {
      id: 4,
      question:
        "Has the company implemented any measures to reduce GHG emissions and its carbon footprint?",
      answer: null,
    },
    {
      id: 5,
      question:
        "Is the company compliant with all required carbon and greenhouse gas (GHG) monitoring and reporting requirements?",
      answer: null,
    },
    {
      id: 6,
      question:
        "Is the company compliant with legally mandated cap-and-trade schemes such as EU ETS, UK ETS, China National ETS?",
      answer: null,
    },
    {
      id: 7,
      question:
        "Has the company conducted a climate change risk assessment to ascertain whether its operations could be at risk from current/evolving climate change regulation?",
      answer: null,
    },
    {
      id: 8,
      question:
        "Has the company conducted a risk assessment to identify if any of its operations could be at risk from physical changes associated with climate change (including increased flooding, drought or other severe weather events) e.g. business disruption or damage to assets, supply chain and production?",
      answer: null,
    },
  ],
  airPollution: [
    {
      id: 1,
      question:
        "The company does not have significant discharges to air as a direct result of its operations.",
      answer: null,
    },
    {
      id: 2,
      question: "The company does not have discharges of toxic emissions.",
      answer: null,
    },
    {
      id: 3,
      question:
        "Have plans been put in place to reduce or eliminate toxic emissions?",
      answer: null,
    },
  ],
  hazardousMaterialManagement: [
    {
      id: 1,
      question:
        "Have all hazardous/toxic chemicals or substances in its processes (note: 'Yes' confirms the absence of hazardous/toxic chemicals or substances in its processes).",
      answer: null,
    },
    {
      id: 2,
      question:
        "Does the company have and follow procedures for the safe use, handling, storage and disposal of hazardous/toxic chemicals and substances?",
      answer: null,
    },
    {
      id: 3,
      question:
        "There are no risks of soil contamination resulting from the activities of the company.",
      answer: null,
    },
    {
      id: 4,
      question:
        "The company is unaware of any past or current soil or groundwater contamination issues at any of its locations or the need to conduct investigation or remediation activities.",
      answer: null,
    },
    {
      id: 5,
      question:
        "There have been no significant spills or leaks of hazardous/toxic chemicals or substances in the last three years.",
      answer: null,
    },
    {
      id: 6,
      question:
        "Have plans been put in place to reduce or replace hazardous/toxic chemicals and substances with more environmentally-friendly and safer materials in operations or the production process?",
      answer: null,
    },
    {
      id: 7,
      question:
        "Has the company engaged with their suppliers to reduce or replace hazardous/toxic chemicals and substances with more environmentally friendly and safer materials in the production process?",
      answer: null,
    },
    {
      id: 8,
      question:
        "Does the company assess contaminated land risks in the acquisition of new assets?",
      answer: null,
    },
  ],
  naturalResourceManagement: [
    {
      id: 1,
      question:
        "Does the company consider ESG principles in the sourcing of raw materials for production?",
      answer: null,
    },
    {
      id: 2,
      question:
        "The company's production processes do not have an adverse impact on biodiversity.",
      answer: null,
    },
    {
      id: 3,
      question:
        "The company's products, packaging, storage, supply, and use do not have an adverse impact on biodiversity.",
      answer: null,
    },
    {
      id: 4,
      question: "The company does not operate in an energy intensive sector.",
      answer: null,
    },
    {
      id: 5,
      question:
        "Are the company's primary energy sources from renewable resources?",
      answer: null,
    },
    {
      id: 6,
      question:
        "Are there any plans in place to monitor energy consumption and reduce energy consumption, improve energy efficiency, and increase the percentage of renewable energy in the company's energy mix?",
      answer: null,
    },
    {
      id: 7,
      question:
        "Do the products offered have energy labelling/certifications where possible?",
      answer: null,
    },
    {
      id: 8,
      question:
        "Has the company assessed opportunities to generate its own sources of energy/power at its locations?",
      answer: null,
    },
    {
      id: 9,
      question: "The company operations are not water intensive.",
      answer: null,
    },
    {
      id: 10,
      question:
        "Have initiatives been put in place to monitor and reduce water consumption and improve efficiencies?",
      answer: null,
    },
  ],
  wasteManagement: [
    {
      id: 1,
      question:
        "The company does not have significant discharges to land or water as a direct result of the business operations.",
      answer: null,
    },
    {
      id: 2,
      question:
        "The company's production processes do not generate significant quantities of waste or hazardous waste.",
      answer: null,
    },
    {
      id: 3,
      question:
        "Does the company have and follow procedures for the responsible disposal of expired or unused raw materials?",
      answer: null,
    },
    {
      id: 4,
      question:
        "Does the company have and follow procedures for the reduction, reuse, and recycling of waste?",
      answer: null,
    },
  ],
  regulatoryCompliance: [
    {
      id: 1,
      question:
        "Is the company fully compliant with all relevant environmental permits/licences/consents?",
      answer: null,
    },
    {
      id: 2,
      question:
        "There have not been any environmental regulatory issues, breaches, non-compliances, enforcement actions, prosecutions, or fines in the last three years.",
      answer: null,
    },
    {
      id: 3,
      question:
        "Has the company recognised adequate financial provisions in their annual accounts to address environmental issues, breaches, non-compliance, enforcements, prosecutions, or fines if they exist?",
      answer: null,
    },
  ],
  pollutionPrevention: [
    {
      id: 1,
      question: "Hazardous substances are not used in the production process.",
      answer: null,
    },
    {
      id: 2,
      question:
        "The company is unaware of any potential disruption to the use of chemical/hazardous substances in the production process through regulatory phase-out e.g. REACH regulation.",
      answer: null,
    },
    {
      id: 3,
      question:
        "Is the company considering the use of more environmental-friendly and safer raw materials/chemicals in the production, packaging, storage, and supply of finished products?",
      answer: null,
    },
    {
      id: 4,
      question:
        "Are products/services offered designed to reduce their environmental impact throughout their lifecycle?",
      answer: null,
    },
  ],
};

// Reducer for managing environmental question state
const environmentalReducer = (
  state: EnvironmentalState,
  action: ActionType
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


const EnvironmentalQuestions = () => {

     const [environmentalState, dispatchEnvironmental] = useReducer<
       React.Reducer<EnvironmentalState, ActionType>
     >(environmentalReducer, initialEnvironmentalQuestions);

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
          <SocialQuestion />
        </TabsContent>

        {/* Governance Tab */}
        <TabsContent value="governance">
          <GovernanceQuestion />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default EnvironmentalQuestions;
