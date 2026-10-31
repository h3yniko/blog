import * as stylex from "@stylexjs/stylex";
import { Link } from "react-router";
import { layoutStyles } from "app/components/layout";

export function meta() {
  return [{ title: "Checklists - Nick K blog" }];
}

export default function Checklists() {
  return (
    <main {...stylex.props(layoutStyles.layout)}>
      <p>
        <Link to="/" reloadDocument>
          Home
        </Link>
      </p>
      <section>
        <h2>Checklists</h2>
        <ul>
          <li>
            <Link to="/checklists/travel-by-train" reloadDocument>
              Travel by train
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
