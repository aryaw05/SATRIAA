import { useEffect } from "react";

export default function AlertList({ isAlert, clearAlert, position }) {
    useEffect(() => {
        if (isAlert.success?.length > 0 || isAlert.errors?.length > 0) {
            setTimeout(() => {
                clearAlert();
            }, 3000);
        }
    }, [isAlert]);
    return (
        <div
            className={`toast toast-top ${position ? position : "top-right"} ${
                isAlert ? "" : "hidden"
            } z-3`}
        >
            {isAlert && isAlert.errors
                ? isAlert.errors?.map((e, index) => {
                      return (
                          <div key={index} className="alert alert-error">
                              <span>{e}</span>
                          </div>
                      );
                  })
                : isAlert.success?.map((e, index) => {
                      return (
                          <div key={index} className="alert alert-success">
                              <span>{e}</span>
                          </div>
                      );
                  })}
        </div>
    );
}
