import { Avatar } from "@material-ui/core";
import Table from "react-bootstrap/Table";
import st from "../styles/Table.module.css";
export default function StickyHeadTable({ data }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Summoner Name</th>
          <th>Tier</th>
          <th>LP</th>
          <th>Level</th>
          <th>Win Rate</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, k) => (
          <tr key={k + 1}>
            <td>{k + 1}</td>
            <td>
              <h4
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 400,
                }}
              >
                <Avatar
                  src={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/profileicon/${d.icon}.png`}
                />
                <span style={{ marginRight: "10px" }}></span>
                {d.name}
              </h4>{" "}
            </td>
            <td> {d.tier} </td>
            <td> {d.lp} </td>
            <td> {d.level} </td>
            <td> {`${((d.W * 100) / (d.W + d.L)).toFixed(2)}%`} </td>
          </tr>
        ))}
        {/* <tr>
          <td>3</td>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
      </tbody>
    </Table>
  );
}
