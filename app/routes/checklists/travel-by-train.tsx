import * as stylex from "@stylexjs/stylex";
import { Link } from "react-router";
import { layoutStyles } from "app/components/layout";
import { useState } from "react";
import { Checklist, Check } from "app/components/checklist";

export function meta() {
  return [{ title: "Travel by train - Nick K blog" }];
}

export default function TravelByTrain() {
  const [daysInput, setDaysInput] = useState("4");
  const [withLuggage, setWithLuggage] = useState(false);
  const days = Number(daysInput);
  const validDays = Number.isInteger(days) && days >= 1 && days < 30;

  return (
    <main {...stylex.props(layoutStyles.layout)}>
      <p>
        <Link to="/checklists" reloadDocument>
          Checklists
        </Link>
      </p>
      <h1>Travel by train</h1>
      <p>
        <label>
          Days{" "}
          <input
            type="number"
            min="1"
            max="29"
            step="1"
            value={daysInput}
            onChange={(event) => setDaysInput(event.target.value)}
            aria-describedby={!validDays ? "days-error" : undefined}
            aria-invalid={!validDays}
          />
        </label>
      </p>
      <p>
        <label>
          Bags{" "}
          <select
            value={withLuggage ? "luggage" : "backpack"}
            onChange={(event) => setWithLuggage(event.target.value === "luggage")}
          >
            <option value="backpack">Backpack</option>
            <option value="luggage">Backpack + luggage</option>
          </select>
        </label>
      </p>
      {!validDays && <p id="days-error">Enter a whole number from 1 to 29 days.</p>}

      <section>
        <h2>Day before travel</h2>
        <Checklist>
          <Check>Pack Fedya for travel</Check>
          <Check>Plan a travel</Check>
          <Check>Set a next day alarm</Check>
          <Check>Refill my pen</Check>
          <Check>Refill Marina’s pen</Check>
        </Checklist>
      </section>
      <section>
        <h2>Day of travel</h2>
        <Checklist>
          <Check>Turn off snake rail</Check>
          <Check>Turn off electrical sockets</Check>
          <Check>Buy travel snacks</Check>
          <Check>Fill water bottle</Check>
        </Checklist>
      </section>
      <section>
        <h2>Wear</h2>
        <Checklist>
          <Check>(optional) Ring</Check>
          <Check>Casio watch</Check>
          <Check>Google Fit</Check>
        </Checklist>
      </section>
      <section>
        <h2>Pockets / Waist bag</h2>
        <Checklist>
          <Check>HiFi Walker H2 + headphones</Check>
          <Check>XTEINK 4 Pro</Check>
          <Check>Canon S90</Check>
          <Check>AirPods</Check>
          <Check>Phone</Check>
        </Checklist>
      </section>
      <section>
        <h2>Waist bag</h2>
        <Checklist>
          <Check>Power bank + USB-A - USB-C cable</Check>
          <Check>Documents / ID</Check>
          <Check>CeraVe</Check>
          <Check>Tide</Check>
          <Check>Hand sanitiser</Check>
          <Check>Notebook + pen</Check>
        </Checklist>
      </section>
      <section>
        <h2>Backpack</h2>
        <Checklist>
          <Check>Reusable bag for dirty laundry</Check>
          <Check>iPad</Check>
        </Checklist>
      </section>
      {validDays && (
        <Clothes key={`${days}-${withLuggage}`} days={days} withLuggage={withLuggage} />
      )}
      <section>
        <h2>Backpack electronics</h2>
        <Checklist>
          <Check>Phone charger</Check>
          <Check>Mac + charger</Check>
          <Check>Canon cable + charger</Check>
          <Check>XTEINK adapter</Check>
          <Check>USB charger → power bank input cable for overnight charging</Check>
          <Check>USB-C - Lightning cable (for AirPods)</Check>
          <Check>USB-C - USB-C cable</Check>
          <Check>USB-A adapter</Check>
          <Check>USB-C adapter</Check>
        </Checklist>
      </section>
      <section>
        <h2>Backpack bath</h2>
        <Checklist>
          <Check>Toothbrush</Check>
        </Checklist>
      </section>
    </main>
  );
}

function Clothes({ days, withLuggage }: { days: number; withLuggage: boolean }) {
  const packedSets = Math.max(1, days - 1);
  const luggageSets = packedSets - 1;
  return (
    <section>
      <p>
        Wear one shirt, one pair of underwear, and one pair of socks for travel. Quantities below
        are for packing, with at least one spare set.
      </p>
      <section>
        <h2>Backpack clothes</h2>
        <Checklist>
          <Check>{withLuggage ? 1 : packedSets} × underwear</Check>
          <Check>{withLuggage ? 1 : packedSets} × socks</Check>
          <Check>{withLuggage ? 1 : packedSets} × T-shirts</Check>
          {!withLuggage && (
            <>
              <Check>1 × T-shirt for sleeping</Check>
              <Check>1 spare pair of trousers</Check>
              <Check>1 spare jumper or fleece</Check>
            </>
          )}
        </Checklist>
      </section>
      {withLuggage && (
        <section>
          <h2>Luggage clothes</h2>
          <Checklist>
            {luggageSets > 0 && (
              <>
                <Check>{luggageSets} × underwear</Check>
                <Check>{luggageSets} × socks</Check>
                <Check>{luggageSets} × T-shirts</Check>
              </>
            )}
            <>
              <Check>1 × T-shirt for sleeping</Check>
              <Check>1 spare pair of trousers</Check>
              <Check>1 spare jumper or fleece</Check>
            </>
          </Checklist>
        </section>
      )}
    </section>
  );
}
