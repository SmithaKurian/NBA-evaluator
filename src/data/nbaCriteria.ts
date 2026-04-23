import { Criterion } from './types';

export const NBA_CRITERIA: Criterion[] = [
  {
    id: 1,
    name: "Outcome-based Curriculum",
    maxMarks: 120,
    subCriteria: [
      {
        id: "1.1",
        name: "Vision, Mission and Program Educational Objectives (PEOs)",
        maxMarks: 35,
        subCriteria: [
          {
            id: "1.1.1",
            name: "State the Vision and Mission of the Institute and the Department",
            maxMarks: 5,
            guidelines: [
              { id: "1.1.1.A", description: "Availability of the vision and mission statements of the Department", maxMarks: 1 },
              { id: "1.1.1.B", description: "Appropriateness and relevance of the statements", maxMarks: 2 },
              { id: "1.1.1.C", description: "Consistency of the Department vision and mission statements with the Institute Vision and Mission", maxMarks: 2 }
            ]
          },
          {
            id: "1.1.2",
            name: "State PEOs of the Program",
            maxMarks: 5,
            guidelines: [
              { id: "1.1.2.A", description: "Listing of the Program Educational Objectives (3 to 5) and their appropriateness", maxMarks: 5 }
            ]
          },
          {
            id: "1.1.3",
            name: "Process of Defining Vision, Mission and PEOs",
            maxMarks: 10,
            guidelines: [
              { id: "1.1.3.A", description: "Description of the process involved in defining the Vision, Mission of the Department", maxMarks: 6 },
              { id: "1.1.3.B", description: "Description of the process involved in defining the PEOs of the program", maxMarks: 4 }
            ]
          },
          {
            id: "1.1.4",
            name: "Dissemination of Vision, Mission and PEOs",
            maxMarks: 5,
            guidelines: [
              { id: "1.1.4.A", description: "Adequacy in respect of publication & dissemination", maxMarks: 3 },
              { id: "1.1.4.B", description: "Process of dissemination among stakeholders", maxMarks: 2 }
            ]
          },
          {
            id: "1.1.5",
            name: "Mapping of PEOs with Mission",
            maxMarks: 10,
            guidelines: [
              { id: "1.1.5.A", description: "Preparation of a matrix of PEOs and mission statement", maxMarks: 5 },
              { id: "1.1.5.B", description: "Consistency/justification of correlation parameters", maxMarks: 5 }
            ]
          }
        ]
      },
      {
        id: "1.2",
        name: "Curriculum Structure and Features",
        maxMarks: 30,
        subCriteria: [
          { id: "1.2.1", name: "State the Process for Developing/Revising the Program Curriculum", maxMarks: 10 },
          { id: "1.2.2", name: "Curriculum Structure", maxMarks: 10 },
          { id: "1.2.3", name: "Components of Curriculum", maxMarks: 5 },
          { id: "1.2.4", name: "Strategies for Education Reforms", maxMarks: 5 }
        ]
      },
      {
        id: "1.3",
        name: "PO, PSO and their Mapping with Courses",
        maxMarks: 20,
        subCriteria: [
          { id: "1.3.1", name: "POs and PSOs", maxMarks: 5 },
          { id: "1.3.2", name: "Mapping between the Courses and POs/PSOs", maxMarks: 15 }
        ]
      },
      {
        id: "1.4",
        name: "Course Outcomes and Course Articulation Matrix",
        maxMarks: 30,
        subCriteria: [
          { id: "1.4.1", name: "Course Outcome (Semester Wise)", maxMarks: 15 },
          { id: "1.4.2", name: "Course Articulation Matrix", maxMarks: 15 }
        ]
      },
      { id: "1.5", name: "Program Articulation Matrix", maxMarks: 5 }
    ]
  },
  {
    id: 2,
    name: "Outcome Based Teaching Learning",
    maxMarks: 120,
    subCriteria: [
      {
        id: "2.1",
        name: "Describe Processes Followed to Ensure Quality of Teaching & Learning",
        maxMarks: 20,
        guidelines: [
          { id: "2.1.A", description: "Adherence to the Academic Calendar", maxMarks: 2 },
          { id: "2.1.B", description: "Pedagogical Initiatives", maxMarks: 5 },
          { id: "2.1.C", description: "Support students based on their ability", maxMarks: 4 },
          { id: "2.1.D", description: "Quality of Classroom Teaching", maxMarks: 4 },
          { id: "2.1.E", description: "Conduct of Experiments", maxMarks: 5 }
        ]
      },
      {
        id: "2.2",
        name: "Quality of Student Capstone Project",
        maxMarks: 25,
        guidelines: [
          { id: "2.2.A", description: "Identification of capstone project and allocation of guides", maxMarks: 5 },
          { id: "2.2.B", description: "Types and relevance and contribution towards POs/PSOs", maxMarks: 6 },
          { id: "2.2.C", description: "Continuous monitoring process", maxMarks: 4 },
          { id: "2.2.D", description: "Quality of completed projects/models/prototypes", maxMarks: 10 }
        ]
      },
      {
        id: "2.3",
        name: "Internship/Industrial Training",
        maxMarks: 10,
        guidelines: [
          { id: "2.3.A", description: "Process of Internship/Industrial training for students", maxMarks: 3 },
          { id: "2.3.B", description: "Mapping with POs and PSOs", maxMarks: 4 },
          { id: "2.3.C", description: "Student feedback & analysis", maxMarks: 3 }
        ]
      },
      { id: "2.4", name: "Seminar and Mini/Micro Projects", maxMarks: 10 },
      { id: "2.5", name: "Case Studies and Real-Life Examples", maxMarks: 10 },
      { id: "2.6", name: "SWAYAM/NPTEL/MOOC/Self Learning", maxMarks: 10 },
      { id: "2.7", name: "Solving Complex Engineering Problems Incorporating Sustainability Goals", maxMarks: 20 },
      { id: "2.8", name: "Steps Taken for Enhancing Industry Institute Partnerships", maxMarks: 15 }
    ]
  },
  {
    id: 3,
    name: "Outcome-Based Assessment",
    maxMarks: 120,
    subCriteria: [
      { id: "3.1", name: "Evaluation of Continuous Assessment: Assignments, Unit Tests, etc", maxMarks: 10 },
      { id: "3.2", name: "Evaluation of Semester End Exam (SEE) Question Paper", maxMarks: 10 },
      { id: "3.3", name: "Evaluation of Laboratory Work and Workshop (Continuous and SEE)", maxMarks: 10 },
      { id: "3.4", name: "Evaluation of Industrial Training/ Internship (Continuous and SEE)", maxMarks: 10 },
      { id: "3.5", name: "Evaluation of Projects", maxMarks: 20 },
      { id: "3.6", name: "Evidence of Addressing Sustainable Development Goals (SDG)", maxMarks: 10 },
      { id: "3.7", name: "Attainment of Course Outcomes", maxMarks: 25 },
      { id: "3.8", name: "Attainment of Program Outcomes and Program Specific Outcomes", maxMarks: 25 }
    ]
  },
  {
    id: 4,
    name: "Students’ Performance",
    maxMarks: 120,
    subCriteria: [
      { id: "4.1", name: "Enrolment Ratio in the First Year", maxMarks: 20 },
      { id: "4.2", name: "Success Rate of the Students in the Stipulated Period", maxMarks: 15 },
      { id: "4.3", name: "Academic Performance of the First-Year Students", maxMarks: 10 },
      { id: "4.4", name: "Academic Performance of the Second Year Students", maxMarks: 10 },
      { id: "4.5", name: "Academic Performance of the Third Year Students", maxMarks: 10 },
      { id: "4.6", name: "Placement, Higher Studies and Entrepreneurship", maxMarks: 30 },
      { id: "4.7", name: "Professional Activities", maxMarks: 25 }
    ]
  },
  {
    id: 5,
    name: "Faculty Information",
    maxMarks: 100,
    subCriteria: [
      { id: "5.1", name: "Student-Faculty Ratio (SFR)", maxMarks: 30 },
      { id: "5.2", name: "Faculty Qualification", maxMarks: 25 },
      { id: "5.3", name: "Faculty Cadre Proportion", maxMarks: 25 },
      { id: "5.4", name: "Visiting/Adjunct Faculty/ Professor of Practice", maxMarks: 10 },
      { id: "5.5", name: "Faculty Retention", maxMarks: 10 }
    ]
  },
  {
    id: 6,
    name: "Faculty Contributions",
    maxMarks: 120,
    subCriteria: [
      { id: "6.1", name: "Professional Development Activities", maxMarks: 60 },
      { id: "6.2", name: "Research and Development Activities", maxMarks: 60 }
    ]
  },
  {
    id: 7,
    name: "Facilities and Technical Support",
    maxMarks: 100,
    subCriteria: [
      { id: "7.1", name: "Adequate and Well-Equipped Laboratories", maxMarks: 40 },
      { id: "7.2", name: "Additional Facilities Created", maxMarks: 20 },
      { id: "7.3", name: "Maintenance of Laboratories and Overall Ambiance", maxMarks: 10 },
      { id: "7.4", name: "Safety Measures in Laboratories", maxMarks: 10 },
      { id: "7.5", name: "Project Laboratory/Research Laboratory", maxMarks: 20 }
    ]
  },
  {
    id: 8,
    name: "Continuous Improvement",
    maxMarks: 80,
    subCriteria: [
      { id: "8.1", name: "Actions Taken Based on Evaluation of COs, POs, and PSOs", maxMarks: 40 },
      { id: "8.2", name: "Academic Audit and Actions Taken", maxMarks: 15 },
      { id: "8.3", name: "Improvement in Faculty Qualification/ Contribution", maxMarks: 15 },
      { id: "8.4", name: "Improvement in Academic Performance", maxMarks: 10 }
    ]
  },
  {
    id: 9,
    name: "Student Support System and Governance",
    maxMarks: 120,
    subCriteria: [
      { id: "9.1", name: "First Year Student-Faculty Ratio (FYSFR)", maxMarks: 5 },
      { id: "9.2", name: "Mentoring System", maxMarks: 5 },
      { id: "9.3", name: "Feedback Analysis", maxMarks: 10 },
      { id: "9.4", name: "Training and Placement Support", maxMarks: 10 },
      { id: "9.5", name: "Start-up and Entrepreneurship Activities", maxMarks: 5 },
      { id: "9.6", name: "Governance and Transparency", maxMarks: 25 },
      { id: "9.7", name: "Budget Allocation & Utilization (Institute Level)", maxMarks: 12 },
      { id: "9.8", name: "Program Specific Budget Allocation & Utilization", maxMarks: 8 },
      { id: "9.9", name: "Quality of Learning Resources (Hard/Soft)", maxMarks: 5 },
      { id: "9.10", name: "E-Governance", maxMarks: 5 },
      { id: "9.11", name: "SDG Initiatives", maxMarks: 10 },
      { id: "9.12", name: "Innovative Educational Initiatives", maxMarks: 5 },
      { id: "9.13", name: "Faculty Performance Appraisal (FPADS)", maxMarks: 10 },
      { id: "9.14", name: "Outreach Activities", maxMarks: 5 }
    ]
  }
];
