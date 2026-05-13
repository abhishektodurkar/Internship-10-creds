import { EmployeeRepository } from '../../repositories/core/employee.repository';
export class EmployeeService {
  constructor(private readonly repository = new EmployeeRepository()) {}
  list(companyId: string) { return this.repository.list(companyId); }
  create(companyId: string, input: Parameters<EmployeeRepository['create']>[1]) { return this.repository.create(companyId, input); }
}
