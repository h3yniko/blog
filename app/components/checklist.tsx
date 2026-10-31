import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

export function Checklist({ children }: { children: ReactNode }) {
  return <ul {...stylex.props(styles.list)}>{children}</ul>;
}

export function Check({ children }: { children: ReactNode }) {
  return (
    <li {...stylex.props(styles.item)}>
      <label {...stylex.props(styles.label)}>
        <input type="checkbox" defaultChecked={false} autoComplete="off" />
        <span>{children}</span>
      </label>
    </li>
  );
}

const styles = stylex.create({
  list: { listStyle: "none", paddingLeft: 0 },
  item: { marginBottom: 8 },
  label: { display: "flex", alignItems: "baseline", gap: 8, cursor: "pointer" },
});
