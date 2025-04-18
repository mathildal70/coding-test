import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [reps, setReps] = useState([]);
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    role: "",
    region: "",
    deal_client: "",
    deal_status: "",
    client_name: "",
    client_industry: "",
  });
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const fetchFilteredData = async () => {
    setLoading(true);
    setShowTable(true);

    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });

    try {
      const res = await fetch(`http://localhost:8000/api/data?${params.toString()}`);
      const data = await res.json();

      if (res.status === 200) {
        setReps(data.output_schema || []);
      } else {
        setReps([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setReps([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Sales Representatives</h1>

      {/* Inquiry Sales Card */}
      <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Inquiry Sales</h5>
      </div>
      <div className="card-body">
        {/* Basic filters */}
        <div className="row">
          {["id", "name", "role", "region"].map((field) => (
            <div className="col-md-3 mb-3" key={field}>
              <input
                type="text"
                className="form-control"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={filters[field]}
                onChange={handleFilterChange}
              />
            </div>
          ))}
        </div>

        {/* Toggle button */}
        <div className="mb-3">
          <button
            className="btn btn-outline-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#advancedFilters"
            aria-expanded="false"
            aria-controls="advancedFilters"
          >
            More Filters
          </button>
        </div>

        {/* Detailed Filters */}
        <div className="collapse" id="advancedFilters">
          <div className="card card-body border">
            <div className="row">
              {[
                { name: "deal_client", placeholder: "Deal Client" },
                { name: "deal_status", placeholder: "Deal Status" },
                { name: "client_name", placeholder: "Client Name" },
                { name: "client_industry", placeholder: "Client Industry" },
              ].map(({ name, placeholder }) => (
                <div className="col-md-6 mb-3" key={name}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={placeholder}
                    name={name}
                    value={filters[name]}
                    onChange={handleFilterChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Apply button */}
        <button className="btn btn-primary mt-3" onClick={fetchFilteredData}>
          Apply Filters
        </button>
      </div>
    </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Sales Info Table Card */}
      {showTable && (
        <div className="card mt-4">
          <div className="card-header">
            <h5 className="card-title mb-0">Sales Information</h5>
          </div>
          <div className="card-body">
            {reps.length > 0 ? (
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Region</th>
                  </tr>
                </thead>
                <tbody>
                  {reps.map((rep) => (
                    <tr key={rep.id}>
                      <td>
                        <Link href={`/details/${rep.id}`}>{rep.name}</Link>
                      </td>
                      <td>{rep.role}</td>
                      <td>{rep.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
