import React, { useReducer } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Define the type for a question
type Question = {
  id: number;
  question: string;
  answer: boolean | null;
};

// Define the reducer action types
type ActionType = {
  type: "UPDATE_ANSWER";
  section: keyof SocialState;
  id: number;
  answer: boolean;
};

// Define the structure of the social questions
type SocialState = {
  workerHealthSafety: Question[];
  humanRightsLabourPractices: Question[];
  regulatoryComplianceSocial: Question[];
  communityInvolvement: Question[];
  consumerSafetyProductSafety: Question[];
};

// Initial state for Social questions
const initialSocialQuestions: SocialState = {
  workerHealthSafety: [
    {
      id: 1,
      question:
        "Does the company have and adhere to an occupational health & safety (OHS) policy which sets out clear commitments and targets to improve worker health & safety?",
      answer: null,
    },
    {
      id: 2,
      question:
        "Does the company's OHS policy have executive and/or board-level commitment, support, and endorsement?",
      answer: null,
    },
    {
      id: 3,
      question:
        "Is the company's OHS policy regularly reviewed and updated accordingly?",
      answer: null,
    },
    {
      id: 4,
      question: "Does the company have a functional OHS management system?",
      answer: null,
    },
    {
      id: 5,
      question:
        "Has the OHS been externally certified and if so to what standard e.g. ISO 45001, OHSAS 18001?",
      answer: null,
    },
    {
      id: 6,
      question:
        "Does the company provide employees and senior management with OHS induction/training where necessary?",
      answer: null,
    },
    {
      id: 7,
      question:
        "Do the company’s working conditions show high regard for its employees’ health and safety?",
      answer: null,
    },
    {
      id: 8,
      question:
        "Does the company embrace a culture of safety and has safety culture review been conducted across the organisation?",
      answer: null,
    },
    {
      id: 9,
      question:
        "Does the company have formal processes for regularly undertaking workplace risk assessments?",
      answer: null,
    },
    {
      id: 10,
      question:
        "Does the company monitor and report workplace incidents, accidents and near misses?",
      answer: null,
    },
    {
      id: 11,
      question:
        "The company has not had any significant workplace incidents, accidents or near misses in the last three years?",
      answer: null,
    },
    {
      id: 12,
      question:
        "Has the company implemented any significant projects/initiatives to improve OHS performance/standards/compliance?",
      answer: null,
    },
    {
      id: 13,
      question:
        "The company is unaware of any instance where workers are or could have been exposed to high incidence or high risk of diseases related to their occupation?",
      answer: null,
    },
    {
      id: 14,
      question:
        "The company is not presently, and has not in the last three years been, subject to any enforcement actions by regulators for breaches of relevant OHS legislation?",
      answer: null,
    },
    {
      id: 15,
      question: "The company is not classified as a major risk facility?",
      answer: null,
    },
  ],
  humanRightsLabourPractices: [
    {
      id: 1,
      question:
        "Does the company have and adhere to a policy which sets out clear commitments and targets to support gender equality, racial diversity and equal opportunity and remuneration in the workforce?",
      answer: null,
    },
    {
      id: 2,
      question:
        "Does the company have and adhere to a policy which sets out clear commitments and targets that cover discrimination and child, forced or compulsory labour in its workforce and its supply chain?",
      answer: null,
    },
    {
      id: 3,
      question:
        "Does the company have and adhere to a policy which sets out clear commitments and targets that covers sexual harassment?",
      answer: null,
    },
    {
      id: 4,
      question:
        "Does the company have and adhere to a policy which sets out clear commitments and targets to identify, assess and address human rights, labour standards and modern slavery risks in its operations and throughout its supply chain?",
      answer: null,
    },
    {
      id: 5,
      question:
        "Does the company have and adhere to a policy which supports freedom of association, the right to organise and collective bargaining in its operations and throughout its supply chain?",
      answer: null,
    },
    {
      id: 6,
      question: "Do all employees have formal contracts of employment?",
      answer: null,
    },
    {
      id: 7,
      question:
        "Does the company abide by the 8 Fundamental Conventions of the International Labour Organization (ILO) throughout its operations and supply chains?",
      answer: null,
    },
    {
      id: 8,
      question:
        "Is ongoing compliance with the ILO Conventions a stated objective by the company?",
      answer: null,
    },
    {
      id: 9,
      question: "Does the company provide ESG training to employees?",
      answer: null,
    },
    {
      id: 10,
      question:
        "Is there a formal and functional grievance mechanism for employees and contractors?",
      answer: null,
    },
    {
      id: 11,
      question:
        "Are employees able to share their views and concerns and are they heeded and responded to?",
      answer: null,
    },
    {
      id: 12,
      question:
        "Does the company promote employee engagement and is there worker representation at the company?",
      answer: null,
    },
    {
      id: 13,
      question:
        "Does the company have insurance policies in place for employees and industrial injury claims?",
      answer: null,
    },
    {
      id: 14,
      question:
        "Does the company have programs in place to reduce employee turnover and improve talent retention rates?",
      answer: null,
    },
    {
      id: 15,
      question: "Does the company offer an employee benefits program?",
      answer: null,
    },
    {
      id: 16,
      question: "Do all employees meet minimum age standards and regulations?",
      answer: null,
    },
    {
      id: 17,
      question: "Do all employees meet minimum wage standards and regulations?",
      answer: null,
    },
    {
      id: 18,
      question:
        "Does the company ensure that sub-contractors are treated fairly, ethically and in accordance with local standards and regulations?",
      answer: null,
    },
    {
      id: 19,
      question:
        "Does the company employ migrant workers and if so, do they ensure minimum standards of human rights are adhered to?",
      answer: null,
    },
    {
      id: 20,
      question:
        "If the company employs migrant workers, are they able to work with associations or NGOs that support the rights of migrant workers e.g. Migrants’ Rights Network (UK)?",
      answer: null,
    },
    {
      id: 21,
      question:
        "Is the company compliant with all local regulations where they operate in relation to modern slavery?",
      answer: null,
    },
  ],
  regulatoryComplianceSocial: [
    {
      id: 1,
      question:
        "The company has not been subject to any enforcement action by regulatory authorities for breaches of relevant employment, health & safety legislation in the last three years?",
      answer: null,
    },
    {
      id: 2,
      question:
        "The company has not had any serious social-related complaints, claims, or enforcement actions associated with employees or key stakeholders in the last three years?",
      answer: null,
    },
    {
      id: 3,
      question:
        "The company has not had any serious human rights or labour-related complaints, claims, or enforcement actions in the last three years?",
      answer: null,
    },
    {
      id: 4,
      question:
        "The company’s suppliers have not had any serious human rights or labour-related complaints, claims, or enforcement actions in the last three years?",
      answer: null,
    },
  ],
  communityInvolvement: [
    {
      id: 1,
      question:
        "Does the company provide community investments, sponsorships, or product donations?",
      answer: null,
    },
    {
      id: 2,
      question:
        "Are there any formal community relations programs in place to promote company involvement in the community?",
      answer: null,
    },
    {
      id: 3,
      question:
        "The company has not been involved in any community or workforce unrest in the last three years?",
      answer: null,
    },
    {
      id: 4,
      question:
        "The company has not been involved in any negative NGO/media campaigns in the last three years?",
      answer: null,
    },
    {
      id: 5,
      question:
        "Does the company have formal programs in place to improve its social impact, internally and in the broader community?",
      answer: null,
    },
  ],
  consumerSafetyProductSafety: [
    {
      id: 1,
      question:
        "Does the company have policies in place to ensure the health and safety of consumers?",
      answer: null,
    },
    {
      id: 2,
      question:
        "Is the company compliant with any product or sector specific regulations that it is bound by e.g. food safety, pharma GMP, other?",
      answer: null,
    },
    {
      id: 3,
      question:
        "Is the company compliant with product/service information and fair disclosure/labelling it is bound by?",
      answer: null,
    },
    {
      id: 4,
      question:
        "The company has not been involved in any incidents of non-compliance concerning product or service information or fair disclosure/labelling in the past three years?",
      answer: null,
    },
    {
      id: 5,
      question:
        "Does the company take responsibility for the environmental impacts of its products throughout their lifecycle?",
      answer: null,
    },
  ],
};

// Reducer for managing social question state
const socialReducer = (state: SocialState, action: ActionType): SocialState => {
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

const SocialQuestion = () => {
  const [socialState, dispatchSocial] = useReducer<
    React.Reducer<SocialState, ActionType>
  >(socialReducer, initialSocialQuestions);

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
