import { useCallback } from "react";
import { formatDuration, parseISO, intervalToDuration } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR";

const useUtils = () => {
  const numberToRem = useCallback((number = 0) => {
    if (typeof number === "number") {
      const fontSize = window.getComputedStyle(document.body).fontSize;
      const px = Number(fontSize.replace("px", ""));
      const rem = number * px;
      return rem;
    } else {
      return 0;
    }
  }, []);

  const limitName = useCallback((name, limit = 2) => {
    if (!name) return " ";
    const splitedName = name.split(" ");
    const limitedName = splitedName.filter((_, i) => i <= limit - 1).join(" ");
    return limitedName;
  }, []);

  const toBRL = useCallback((value) => {
    if (typeof value === "number") {
      return value?.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
    }
  }, []);

  const convertDateTobirthday = useCallback(
    (dateToConvert, unities = ["years", "months", "days"], delimiter = ", ", abreviation = false) => {
      if (!dateToConvert) return " ";
      const duration = intervalToDuration({
        start: parseISO(dateToConvert),
        end: new Date(),
      });

      const filteredDuration = {};
      unities.forEach((unit) => {
        filteredDuration[unit] = duration[unit];
      });

      const formatedDate = formatDuration(filteredDuration, {
        delimiter,
        locale: ptBR,
      });

      if (abreviation) {
        return formatedDate.split(delimiter).reduce((acc, current, index, array) => {
          const [number, name] = current.split(" ");
          const newValue = `${number}${name?.slice(0, 1)}${index === array.length - 1 ? "" : delimiter}`;
          return acc + newValue;
        }, "");
      }
      return formatedDate;
    },
    []
  );

  const mediumOfTimes = useCallback((times) => {
    const secondsTimes = times.map((time) => {
      const splitTime = time.split(":");
      const secondsTime = parseInt(splitTime[0]) * 3600 + parseInt(splitTime[1]) * 60 + parseInt(splitTime[2]);
      return secondsTime;
    });

    const fullTime = secondsTimes.reduce((acc, secondsTime) => acc + secondsTime);
    const media = fullTime / times.length;
    const mediumTime = new Date(media * 1000).toISOString().substr(11, 8);
    const splitMediumTime = mediumTime.split(":").map((value) => value);

    return {
      hours: splitMediumTime[0],
      minutes: splitMediumTime[1],
      seconds: splitMediumTime[2],
    };
  }, []);

  const calcPercent = useCallback((small, larger) => {
    if (small > 0) {
      return Math.round((small / larger) * 100);
    } else {
      return 0;
    }
  }, []);

  const getPageDimensions = useCallback(() => {
    const body = document.body;
    const dimensions = body.getBoundingClientRect();
    return dimensions;
  }, []);

  const getFontSize = () => {
    let fontSize = window.getComputedStyle(document.body).fontSize;
    fontSize = Number(fontSize.replace("px", ""));
    return fontSize;
  };

  function formatDate(date, type) {
    let fullDate = date.split("T")[0].split("-");
    let formatedDate = "";

    if (type === "DM") {
      formatedDate = `${fullDate[2]}/${fullDate[1]}`;
    } else if (type === "D") {
      formatedDate = fullDate[2];
    } else {
      formatedDate = `${fullDate[2]}/${fullDate[1]}/${fullDate[0]}`;
    }

    return formatedDate;
  }

  function getLimit(array, identifier) {
    let total = 0;

    if (identifier) {
      total = array?.reduce((acc, obj) => {
        const max = obj[identifier];
        return acc > max ? acc : max;
      }, 0);
    } else {
      total = array?.reduce((acc, obj) => {
        const values = Object.values(obj);
        const numbers = values.filter((value) => typeof value === "number");
        const max = Math.max(...numbers);
        return acc > max ? acc : max;
      }, 0);
    }

    total = total === 0 ? 100 : total;
    return total;
  }

  return {
    numberToRem,
    limitName,
    toBRL,
    convertDateTobirthday,
    mediumOfTimes,
    calcPercent,
    getPageDimensions,
    getFontSize,
    formatDate,
    getLimit,
  };
};

export default useUtils;
