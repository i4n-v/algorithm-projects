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
    calcPercent,
    getPageDimensions,
    getFontSize,
    getLimit,
  };
};

export default useUtils;
