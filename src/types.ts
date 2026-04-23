/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EvaluationGuideline {
  id: string;
  description: string;
  maxMarks: number;
}

export interface SubCriterion {
  id: string;
  name: string;
  maxMarks: number;
  guidelines?: EvaluationGuideline[];
  subCriteria?: SubCriterion[]; // For nested structures like 1.1, 1.1.1
}

export interface Criterion {
  id: number;
  name: string;
  maxMarks: number;
  subCriteria: SubCriterion[];
}

export interface SelfAssessmentScore {
  [path: string]: number; // field path like "1.1.1.A" -> score
}
