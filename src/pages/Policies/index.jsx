import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getPolicy } from "@/services/Policy";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";

function Policy() {
  const [isChecked, setIsChecked] = useState(false);
  const [policies, setPolicies] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const fetchData = () => {
    getPolicy().then((data) => {
      if (typeof data !== "undefined") setPolicies(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!user.access) {
      navigate("/login");
    }
  });

  return (
    <section className="flex items-center justify-center p-9 bg-gradient-to-r from-rose-100 to-teal-100 dark:from-slate-800 dark:to-blue-900">
      <div className="max-w-[1024px] rounded-xl py-5 px-5 md:px-12 bg-primary-foreground text-justify flex flex-col gap-1">
        <h1 className="text-3xl md:text-5xl text-center font-bold">
          Terms of use
        </h1>

        <h1 className="text-xl my-2">Thank you for using Fujichat!</h1>
        <h1 className="my-2">
          These Terms of Use apply when you use the services of Fujichat, L.L.C.
          or our affiliates, including our application programming interface,
          software, tools, developer services, data, documentation, and websites
          (“Services”). The Terms include our Service Terms, Sharing &
          Publication Policy, Usage Policies, and other documentation,
          guidelines, or policies we may provide in writing. By using our
          Services, you agree to these Terms. Our Privacy Policy explains how we
          collect and use personal information.
        </h1>
        <div className="flex flex-col gap-4">
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

        <Button
          disabled={!isChecked}
          onClick={() => {
            navigate("/");
          }}
          className="self-end mt-4"
        >
          Next
        </Button>
      </div>
    </section>
  );
}

export default Policy;
