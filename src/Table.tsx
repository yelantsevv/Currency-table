import { cell, currencyList } from './signals';
import './Table.css';
export const Table = () => {
  console.log('object');
  return (
    <div className="table-container">
      <h2>📐 Currency Table</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>From / To</th>
              {currencyList.map((to) => (
                <th key={to}>{to}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currencyList.map((from) => (
              <tr key={from}>
                <td className='cell_from'><strong>{from}</strong></td>
                {currencyList.map((to) => (
                  <td className="cell" key={to}>{cell(from, to)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
