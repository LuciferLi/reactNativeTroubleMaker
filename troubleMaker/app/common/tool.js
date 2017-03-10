/**
 * Created by lucifer on 2016/02/10.
 *
 *  一些基础工具类，如字符串切割等方法
 */
 /**
  * Created by lucifer on 16/6/3.
  */


  const timeToDay = (time) =>{
    var nowTime = (new Date()).valueOf();
      return Math.floor((time-nowTime)/(24*3600*1000));
  }
  const timeToHours = (time) =>{
    var nowTime = (new Date()).valueOf();
    var leave1 = (time-nowTime)%(24*3600*1000)
      return Math.floor(leave1/(3600*1000))
  }
  const timeToMinutes = (time) =>{
    var nowTime = (new Date()).valueOf();
    var leave1 = (time-nowTime)%(24*3600*1000)
    var leave2=leave1%(3600*1000)
    return Math.floor(leave2/(60*1000))
  }
  const makeCancelable = (promise) => {
    let hasCanceled_ = false;
    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then((val) =>
        hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
      );
      promise.catch((error) =>
        hasCanceled_ ? reject({isCanceled: true}) : reject(error)
      );
    });
    return {
      promise: wrappedPromise,
      cancel() {
        hasCanceled_ = true;
      },
    };
  };

  export default{
      timeToDay,
      timeToMinutes,
      timeToHours,
      makeCancelable
  }
