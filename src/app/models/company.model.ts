export class Company {
  companyId?: number;
  name: string;
  sectorId: number;

  constructor(name: string, sectorId: number, companyId?: number) {
    this.name = name;
    this.sectorId = sectorId;
    if (companyId !== undefined) {
      this.companyId = companyId;
    }
  }
}
