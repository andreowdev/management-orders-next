"use-client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function TableAgendas() {

    const data = [
      {id: "1", status: 1, service: "corte de cabelo", paymentType: "PIX", value: "250"},
      {id: "2", status: 0, service: "Alisamento", paymentType: "C.DÉBITO", value: "250"},
      {id: "3", status: 1, service: "Escova", paymentType: "C.CRÉDITO", value: "250"},
    ]
  return (
    <Table>
      <TableCaption>AGENDA DE HORÁRIOS DISPONÍVEIS.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">N° do Pedido</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Serviço</TableHead>
          <TableHead>Tipo Pagamento</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map( (item) =>
          <TableRow key={item.id}>
          <TableCell className="font-medium">{item.id}</TableCell>
          <TableCell className={`${item.status === 1 ? "text-green-400" : "text-red-400"}`}>{item.status === 1 ? "Disponível" : "Ocupado"}</TableCell>
          <TableCell>{item.service}</TableCell> 
          <TableCell>{item.paymentType}</TableCell>
          <TableCell className="text-right">R${item.value},00</TableCell>
        </TableRow> 
        )}
      </TableBody>
    </Table>

  )
}