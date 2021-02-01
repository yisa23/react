class MyPromise {
  constructor(executor) {
    const self = this;
    self.PENDING = "pending";
    self.RESOLVED = "resolved";
    self.REJECTED = "rejected";

    self.status = self.PENDING;
    self.data = undefined;
    self.callbacks = [];
    executor(resolve, reject);
    function resolve(value) {
      if (self.status !== self.PENDING) {
        return;
      }
      self.status = self.RESOLVED;
      self.data = value;
      setTimeout(() => {
        self.callbacks.forEach((callback) => {
          callback.onResolved(value);
        });
      });
    }
    function reject(reason) {
      if (self.status !== self.PENDING) {
        return;
      }
      self.status = self.REJECTED;
      self.data = reason;
      setTimeout(() => {
        self.callbacks.forEach((callback) => {
          callback.onRejected(reason);
        });
      });
    }
  }
  then(onResolved, onRejected) {
    const self = this;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    onResolved =
      typeof onResolved === "function" ? onResolved : (value) => value;
    return new MyPromise((resolve, reject) => {
      if (self.status === self.RESOLVED) {
        setTimeout(() => {
          handle(onResolved);
        });
      } else if (self.status === self.REJECTED) {
        setTimeout(() => {
          handle(onRejected);
        });
      } else {
        self.callbacks.push({
          onResolved: function () {
            handle(onResolved);
          },
          onRejected: function () {
            handle(onRejected);
          },
        });
      }

      function handle(callbackFn) {
        try {
          let res = callbackFn(self.data);
          if (res instanceof MyPromise) {
            res.then(resolve, reject);
          } else {
            resolve(res);
          }
        } catch (error) {
          reject(error);
        }
      }
    });
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const res = [];
      let count = 0;
      promises.forEach((promise, index) => {
        promise.then((value) => {
          res[index] = value;
          count++;
          if (count === promises.length) {
            resolve(res);
          }
        }, reject);
      });
    });
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject);
      });
    });
  }
}
