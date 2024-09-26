// Define the type for questions in each category
export type Question = {
  id: number;
  question: string;
  answer: boolean | null;
};

// Define the structure for the environmental state, including multiple sections
export type EnvironmentalState = {
  environmentalManagement: Question[];
  climateChange: Question[];
  airPollution: Question[];
  hazardousMaterialManagement: Question[];
  naturalResourceManagement: Question[];
  wasteManagement: Question[];
  regulatoryCompliance: Question[];
  pollutionPrevention: Question[];
};

export type GovernanceState = {
  supplyChainManagement: Question[];
  dataPrivacySecurityManagement: Question[];
};

// Define the structure of the social questions
export type SocialState = {
  workerHealthSafety: Question[];
  humanRightsLabourPractices: Question[];
  regulatoryComplianceSocial: Question[];
  communityInvolvement: Question[];
  consumerSafetyProductSafety: Question[];
};

export const initialEnvironmentalQuestions: EnvironmentalState = {
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

export const initialGovernanceQuestions: GovernanceState = {
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

export const initialSocialQuestions: SocialState = {
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
