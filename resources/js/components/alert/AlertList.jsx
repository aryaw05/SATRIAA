export default function AlertList({ isAlert }) {
    return (
        <div className={`toast toast-top toast-end ${isAlert ? "" : "hidden"}`}>
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
