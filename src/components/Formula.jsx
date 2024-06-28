import { useState } from 'react';
import './Formula.css';

const Formula = () => {
  const [formula, setFormula] = useState('');
  const [isFormulaValid, setIsFormulaValid] = useState(false);

  const [inputs, setInputs] = useState({
    L: '',
    B: '',
    A: '',
    V: '',
    Q: ''
  });

  const [requiredFields, setRequiredFields] = useState([]);
  const [result, setResult] = useState(null);

  const validateFormula = () => {
    try {
      const regex = /\b(L|B|A|V|Q)\b/g;
      const matches = formula.match(regex) || [];
      const uniqueMatches = [...new Set(matches)];

      let testFormula = formula;
      uniqueMatches.forEach((variable) => {
        testFormula = testFormula.replace(new RegExp(variable, 'g'), '1');
      });

      eval(testFormula);
      setRequiredFields(uniqueMatches);
      setIsFormulaValid(true);
    } catch (e) {
      alert('Invalid formula');
      setIsFormulaValid(false);
    }
  };

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const calculateResult = () => {
    try {
      let calculatedFormula = formula;
      for (const [key, value] of Object.entries(inputs)) {
        calculatedFormula = calculatedFormula.replace(new RegExp(key, 'g'), value);
      }
      const result = eval(calculatedFormula);
      setResult(result);
    } catch (e) {
      alert('Error calculating result');
    }
  };

  return (
    <div className="formula-container">
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter formula"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
        />
        <button onClick={validateFormula}>Validate Formula</button>
      </div>

      {isFormulaValid && (
        <div className="inputs-group">
          {['L', 'B', 'A', 'V', 'Q'].map((field) =>
            requiredFields.includes(field) ? (
              <div key={field} className="input-field">
                <label>{field}:</label>
                <input
                  type="number"
                  name={field}
                  value={inputs[field]}
                  onChange={handleChange}
                />
              </div>
            ) : null
          )}
          <button onClick={calculateResult}>Calculate</button>
        </div>
      )}

      {result !== null && (
        <div className="result">
          <p>Result: {result}</p>
        </div>
      )}
    </div>
  );
};

export default Formula;
