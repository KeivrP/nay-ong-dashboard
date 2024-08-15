import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
import InvoiceStatus from "@/app/ui/invoices/status";
import {
  formatDateToLocal,
  formatCurrency,
  getRemainingMonths,
  Data,
} from "@/app/lib/utils";
import { fetchFilteredInvoices } from "@/app/lib/data";

const Meses = ["Abril", "Mayo", "Junio", "Julio"];

const data = [
  {
    Objetivos: "Aumentar ventas 1",
    MetaGeneral: 100000,
    MetaRestante: 45000,
    Meses: {
      Enero: 8000,
      Febrero: 7000,
      Marzo: 6000,
      Abril: 5000,
      Mayo: 4000,
      Junio: 3000,
      Julio: 2000,
      Agosto: 1000,
      Septiembre: 9000,
      Octubre: 8000,
      Noviembre: 7000,
      Diciembre: 6000,
    },
  },
  {
    Objetivos: "Aumentar ventas 2",
    MetaGeneral: 100000,
    MetaRestante: 45000,
    Meses: {
      Enero: 8000,
      Febrero: 7000,
      Marzo: 6000,
      Abril: 5000,
      Mayo: 4000,
      Junio: 3000,
      Julio: 2000,
      Agosto: 1000,
      Septiembre: 9000,
      Octubre: 8000,
      Noviembre: 7000,
      Diciembre: 6000,
    },
  },
] as Data[];

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const a = getRemainingMonths(data);
  const nombresMeses = Object.keys(a);

  console.log(a);

  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Objetivos
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Meta General
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Meta Restante
                </th>
                {nombresMeses.map((a) => (
                  <th scope="col" className="px-3 py-5 font-medium">
                    {a}
                  </th>
                ))}

                <th scope="col" className="relative py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  Editar
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.map((invoice, index) => (
                <tr
                  key={index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{invoice.Objetivos}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.MetaGeneral}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.MetaRestante)}
                  </td>
                  {Object.entries(a).map(([month, value], index) => (
                    <td className="whitespace-nowrap px-3 py-3">{value}</td>
                  ))}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={index.toString()} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
