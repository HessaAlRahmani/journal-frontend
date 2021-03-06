import { View, Dimensions, StyleSheet } from "react-native";
import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { theme } from "../../constants";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function MoodsPieChart({
  userEntriesFeels,
  sumADatesFeelingsAndHealth,
}) {
  const screenWidth = Dimensions.get("window").width - 70;

  const count = {
    undocumented: 0,
    happy: 0,
    ok: 0,
    sad: 0,
    worried: 0,
    amazing: 0,
    angry: 0,
  };

  for (const feeling of userEntriesFeels) {
    if (feeling === "") {
      count["undocumented"] += 1;
    } else if (count[feeling]) {
      count[feeling] += 1;
    } else {
      count[feeling] = 1;
    }
  }

  const dates = sumADatesFeelingsAndHealth.map((element) =>
    element.date.slice(5)
  );
  const feelings = sumADatesFeelingsAndHealth.map(
    (element) => element.feeling / element.numOfDays
  );
  const health = sumADatesFeelingsAndHealth.map(
    (element) => element.health / element.numOfDays
  );

  function* yLabel() {
    yield* ["angry", "sad", "worried", "ok", "happy", "amazing"];
  }
  const yLabelIterator = yLabel();

  //moods & health
  const data = {
    labels: dates,
    datasets: [
      {
        data: feelings,
        color: (opacity = 1) => "#7AA6CC",
      },
      { data: health, color: (opacity = 1) => "#FFD166" },
    ],
    legend: ["feeling", "health"], // optional
  };
  const chartConfig = {
    barPercentage: 0.8,
    backgroundGradientFrom: theme.grey,
    backgroundGradientTo: theme.grey,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(239, 71, 111, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(105, 105, 105, ${opacity})`,
    formatYLabel: () => yLabelIterator.next().value,
    propsForDots: {
      r: "4",
    },
  };

  const data2 = [
    {
      name: "Amazing",
      freq: count.amazing,
      color: "#003d80",
      legendFontColor: "#7F7F7F",
      legendFontSize: RFValue(11),
    },
    {
      name: "Happy",
      freq: count.happy,
      color: "#7AA6CC",
      legendFontColor: "#7F7F7F",
      legendFontSize: RFValue(11),
    },
    {
      name: "Ok",
      freq: count.ok,
      color: "#06D6A0",
      legendFontColor: "#7F7F7F",
      legendFontSize: RFValue(11),
    },
    {
      name: "Worried",
      freq: count.worried,
      color: "#FFD166",
      legendFontColor: "#7F7F7F",
      legendFontSize: RFValue(11),
    },
    {
      name: "Sad",
      freq: count.sad,
      color: "#F78C6B",
      legendFontColor: "#7F7F7F",
      legendFontSize: RFValue(11),
    },
    {
      name: "Angry",
      freq: count.angry,
      color: "#EF476F",
      legendFontColor: "#7F7F7F",
      legendFontSize: RFValue(11),
    },

    {
      name: "Undocumented",
      freq: count.undocumented,
      color: "#64589D",
      legendFontColor: "#7F7F7F",
      legendFontSize: RFValue(11),
    },
  ];

  return (
    <View>
      <View style={[styles.item, { paddingTop: 10, paddingBottom: 10 }]}>
        <PieChart
          data={data2}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          accessor={"freq"}
          center={[10, 0]}
          //absolute
        />
      </View>

      <View style={styles.item}>
        <LineChart
          data={data}
          width={screenWidth}
          height={180}
          fromZero={true}
          chartConfig={chartConfig}
          //bezier
          style={styles.chart}
          verticalLabelRotation={-90}
          xLabelsOffset={16}
          withShadow={false}
          withHorizontalLabels={false}
        />
      </View>

      <View style={styles.item}>
        <BarChart
          style={styles.chart}
          data={data}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 15,
    backgroundColor: theme.grey,
  },

  chart: {
    paddingTop: 15,
    borderRadius: 12,
  },
});
