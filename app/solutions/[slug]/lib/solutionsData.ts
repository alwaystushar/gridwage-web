// app/solutions/lib/solutionsData.ts
import type { Solution } from "./solutionTypes";
import { startupsSolution } from "./startups";
import { HRPeopleTeams } from "./hr-people-teams";
import { RemoteCompanies } from "./RemoteCompanies";
import { SMEsGrowingBusinesses } from "./smes-growing-businesses";
import { Enterprises } from "./enterprises"
import { ComplianceFirst } from "./ComplianceFirst"
import { FastMovingTeams } from "./fast-moving-teams"
import { MissionDriven } from "./mission-driven"


const solutions: Solution[] = [
  startupsSolution,
  HRPeopleTeams,
  RemoteCompanies,
  SMEsGrowingBusinesses,
  Enterprises,
  ComplianceFirst,
  FastMovingTeams,
  MissionDriven,
];

export function getAllSolutions(): Solution[] {
  return solutions;
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
