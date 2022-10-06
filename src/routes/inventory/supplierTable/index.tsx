import React from "react";
import "./supplierTable.scss";
export default function SupplierTable() {
  return (
    <div>
      <div className="supplier-table-content-alignment">
        <table>
          <tr>
            <th align="left">
              <input type="checkbox" name="a" />
            </th>
            <th align="left">
              <span>Name</span>
            </th>
            <th align="left">
              <span>City</span>
            </th>
            <th align="left">
              <span>Phone Number</span>
            </th>
            <th align="left">
              <span>Email</span>
            </th>
          </tr>
          <tr>
            <td align="left">
              <input type="checkbox" name="a" />
            </td>
            <td align="left">
              <span>Rehman Pharmacy</span>
            </td>
            <td align="left">
              <span>Islamabad</span>
            </td>
            <td align="left">
              <span>03659187050</span>
            </td>
            <td align="left">
              <span>RehmanPharcmacy23@gmail.com</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
