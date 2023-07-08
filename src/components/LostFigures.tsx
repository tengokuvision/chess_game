import React, { FC } from "react";
import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <div className="lost__title">{title}</div>
      <div>
        {figures.map((figure) => (
          <span key={figure.id}>
            {figure.logo && (
              <img width={36} height={36} alt="figure" src={figure.logo} />
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LostFigures;
