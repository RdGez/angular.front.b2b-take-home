export interface Operation {
  id:           number;
  createdAt:    Date;
  updatedAt:    Date;
  DeletedAt:    null;
  date:         string;
  status:       Status;
  price:        number;
  loanId:       number;
  merchantId:   number;
  products:     null;
  branchId:     number;
  sellsAgentId: number;
}

export enum Status {
  Activo = "Activo",
  Cancelado = "Cancelado",
  Finalizado = "Finalizado",
  Pendiente = "Pendiente",
  Rechazado = "Rechazado",
}

export interface OperationsResume {
  total: number;
  totalOperations: number;
  average: number;
}
