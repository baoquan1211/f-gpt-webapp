import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { getPolicy } from "../../services/Policy";
import { Checkbox } from "../../components/ui/checkbox.tsx";
import { Label } from "../../components/ui/label";
import { useSelector } from "react-redux";
import "./index.css";

function Policy() {
  const [isChecked, setIsChecked] = useState(false);
  const [policies, setPolicies] = useState([]);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.auth);

  const fetchData = () => {
    getPolicy().then((data) => {
      if (typeof data !== "undefined") setPolicies(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  });

  return (
    <div className="policy-container bg-gradient-to-r from-rose-100 to-teal-100 dark:from-slate-800 dark:to-blue-900">
      <h1 className="policy-header">Terms of use</h1>

      <h1 className="policy-title">Thank you for using Fujichat!</h1>
      <h1 className="policy-title">
        These Terms of Use apply when you use the services of Fujichat, L.L.C.
        or our affiliates, including our application programming interface,
        software, tools, developer services, data, documentation, and websites
        (“Services”). The Terms include our Service Terms, Sharing & Publication
        Policy, Usage Policies, and other documentation, guidelines, or policies
        we may provide in writing. By using our Services, you agree to these
        Terms. Our Privacy Policy explains how we collect and use personal
        information.
      </h1>
      <div className="policy-list">
        {policies.map((policy, index) => (
          <div key={index} className="policy-item">
            <h2 className="policy-name">
              {policy.id}. {policy.name}
            </h2>
            <div
              className="policy-context"
              dangerouslySetInnerHTML={{ __html: policy.policy }}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-foreground"
          checked={isChecked}
          onCheckedChange={() => {
            setIsChecked(!isChecked);
          }}
          id="agree"
        />
        <Label htmlFor="agree">I agree with terms of service</Label>
      </div>
      <div className="button-next">
        <Button
          disabled={!isChecked}
          onClick={() => {
            navigate("/");
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Policy;
