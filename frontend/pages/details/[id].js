import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [rep, setRep] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/data?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          const info = Array.isArray(data.output_schema)
            ? data.output_schema[0]
            : null;
          setRep(info);
        });
    }
  }, [id]);

  if (!rep) return <p className="m-4">Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>{rep.name}</h2>
      <p><strong>Role:</strong> {rep.role}</p>
      <p><strong>Region:</strong> {rep.region}</p>

      {/* Deals Table */}
      <h4>Deals</h4>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Client</th>
            <th>Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rep.deals.map((deal, index) => (
            <tr key={index}>
              <td>{deal.client}</td>
              <td>${deal.value}</td>
              <td>{deal.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Clients Table */}
      <h4>Clients</h4>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {rep.clients.map((client, index) => (
            <tr key={index}>
              <td>{client.name}</td>
              <td>{client.industry}</td>
              <td>{client.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
