const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
};

const generate = (n, ratio) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(Math.random() < ratio ? 0 : 1);
  }
  return result;
};

const no_privacy_logic = (data) => {
        const sum = data.reduce((a, b) => a + b, 0);
        const average = sum / data.length;
    return average;
}

const rr_logic = (data, epsilon) => {
    const p = Math.exp(epsilon)/(Math.exp(epsilon) + 1)
    
    let new_data = [];
    for (let i = 0; i < data.length; i++) {
        if (Math.random() <= p) {
            new_data.push(data[i]);
        }else{
            new_data.push(1 - data[i]);
        }
    }
    const sum = new_data.reduce((a, b) => a + b, 0);
    const est_average = sum / new_data.length;
    const avg = ((1 + Math.exp(epsilon)) * est_average - 1) / (Math.exp(epsilon) - 1);
return avg;
}

const laplace_logic = (data, epsilon) => {

    const sum = data.reduce((a, b) => a + b, 0);
    const avg = sum / data.length;
    const scale = 1.0 / (data.length * Math.exp(epsilon));

    // https://en.wikipedia.org/wiki/Laplace_distribution#Random_variate_generation
    const u = Math.random() - 0.5;
    const noise = 0 - scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u));
    
    
    return avg + noise;
}

const run = (n, runs, ratio, epsilon) => {
    const no_privacy_avgs = [];
    const rr_avgs = [];
    const laplace_avgs = []
    for (let i = 0; i < runs; i++) {
        const generated = generate(n, ratio);
        no_privacy_avgs.push(no_privacy_logic(generated));
        rr_avgs.push(rr_logic(generated, epsilon));
        laplace_avgs.push(laplace_logic(generated, epsilon));
    }
    const no_privacy = no_privacy_avgs.reduce((counts, num) => {
        counts[num] = (counts[num] || 0) + 1;
        return counts;
    }, {})

    const no_privacy_data = {
        x: Object.keys(no_privacy).map(Number),
        y: Object.values(no_privacy),
        name: "no privacy",
        color: "#2ca02f"
    };

    const rr = rr_avgs.reduce((counts, num) => {
        counts[num] = (counts[num] || 0) + 1;
        return counts;
    }, {})

    const rr_data = {
        x: Object.keys(rr).map(Number),
        y: Object.values(rr),
        name: "randomized response",
        color: "#1f77b4"
    };

    const laplace = laplace_avgs.reduce((counts, num) => {
        counts[num] = (counts[num] || 0) + 1;
        return counts;
    }, {})

    const laplace_data = {
        x: Object.keys(laplace).map(Number),
        y: Object.values(laplace),
        name: "Laplace mechanism",
        color: "#ff7f0e"
    };

    console.log(no_privacy_data, rr_data);
    let data = [no_privacy_data, rr_data, laplace_data]
    return data
};

export { run };