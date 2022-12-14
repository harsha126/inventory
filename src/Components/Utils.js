const transformData = (data) => {
  const newArray = {};
  for (const row in data) {
    if (!(data[row].name + data[row].supplier in newArray)) {
      newArray[data[row].name + data[row].supplier] = [data[row]];
    } else {
      newArray[data[row].name + data[row].supplier].push(data[row]);
    }
  }

  for (const name in newArray) {
    let stock = 0;
    let deal = 0;
    let free = 0;
    let ratio = Number.MAX_SAFE_INTEGER;
    let mrp = 0;
    let rate = 0;
    let exp = null;
    for (const row of newArray[name]) {
      stock = stock + +row.stock;
      mrp = Math.max(mrp, +row.mrp);
      rate = Math.max(rate, +row.rate);
      if (exp === null) exp = new Date(row.exp.trim());
      else {
        exp = new Date(row.exp.trim()) > exp ? new Date(row.exp.trim()) : exp;
      }
      if (ratio > +row.free / +row.deal) {
        free = row.free;
        deal = row.deal;
      }
    }

    let newobject = {
      batch: "All",
      code: newArray[name][0].code,
      company: newArray[name][0].company,
      deal,
      exp,
      free,
      mrp,
      name: newArray[name][0].name,
      rate,
      stock,
      supplier: newArray[name][0]["supplier"],
    };

    newArray[name].push(newobject);
  }
  // console.log(newArray);
  return newArray;
};

const transformData2 = (data) => {
  const newArray = {};
  for (const row in data) {
    let newobj = {};
    let suppName = data[row].supplier.replace(/ +(?= )/g,'');
    if(suppName.trim().length===0) suppName = "No Supplier Name"

    newobj[suppName] = [data[row]];
    if (!(data[row].name in newArray)) {
      newArray[data[row].name] = { ...newobj };
    } else {
      if (!(suppName in newArray[data[row].name])) {
        newArray[data[row].name][suppName] = [data[row]];
      } else {
        newArray[data[row].name][suppName].push(data[row]);
      }
    }
  }

  for (const name in newArray) {
    const suppliers = newArray[name];
    for (const supplier in suppliers) {
      let stock = 0;
      let deal = 0;
      let free = 0;
      let ratio = Number.MAX_SAFE_INTEGER;
      let mrp = 0;
      let rate = 0;
      let exp = null;
      for (const row of suppliers[supplier]) {
        stock = stock + +row.stock;
        mrp = Math.max(mrp, +row.mrp);
        rate = Math.max(rate, +row.rate);
        if (exp === null) exp = new Date(row.exp.trim());
        else {
          exp = new Date(row.exp.trim()) > exp ? new Date(row.exp.trim()) : exp;
        }
        if (ratio > +row.free / +row.deal) {
          free = row.free;
          deal = row.deal;
        }
      }
      let newobject = {
        batch: "All",
        code: newArray[name][supplier].code,
        company: newArray[name][supplier].company,
        deal,
        exp,
        free,
        mrp,
        name: newArray[name][supplier].name,
        rate,
        stock,
        supplier: supplier,
      };
      suppliers[supplier].push(newobject);
    }
  }

  console.log(newArray);
  return newArray;
};

const processCSV = (str, delim = ",") => {
  const headers = str
    .slice(0, str.indexOf("\n"))
    .replace(/[\r\n]/gm, "")
    .split(delim);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  const newArray = rows.map((row) => {
    const values = row.split(delim);
    const eachObject = headers.reduce((obj, header, i) => {
      obj[header] = values[i].trim().replace(/[\r\n]/gm, "");
      return obj;
    }, {});
    return eachObject;
  });
  return newArray;
};

export { transformData, processCSV, transformData2 };
