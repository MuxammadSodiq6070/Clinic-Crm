import ClientForm from "../../components/ClientForm";
import ClientTable from "../../components/ClientTable";

export default function ClientPage() {
  return (
    <div className="flex">
      <ClientForm />
      <ClientTable />
    </div>
  );
}
