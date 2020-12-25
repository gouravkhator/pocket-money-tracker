import { h } from "preact";
import { CanvasJSChart } from 'canvasjs-react-charts'
import { useSelector } from "react-redux";

const Chart = () => {
    const children = useSelector(state => state.children);
    let totalMoney = 0;
    let data = [];
    children.forEach((value) => {
        totalMoney += parseInt(value.childMoney);
    });

    children.forEach((value) => {
        data.push({ y: ((value.childMoney / totalMoney) * 100).toFixed(2), label: value.childName })
    });

    const pieChartOptions = {
        animationEnabled: true,
        // exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        title: {
            text: "Pocket Money Spent This Month"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: [...data]
        }]
    }

    // const barChartOptions = {
    //     animationEnabled: true,
    //     // exportEnabled: true,
    //     theme: "light1", // "light1", "dark1", "dark2"
    //     title: {
    //         text: "Analysis in Bar Graph"
    //     },
    //     axisX: {

    //     },
    //     axisY: {
    //         interlacedColor: "rgba(1,77,101,.2)",
    //         gridColor: "rgba(1,77,101,.1)",
    //         title: "Your Child's Pocket Money"
    //     },
    //     data: [{
    //         type: "column",
    //         dataPoints: [...data]
    //     }]
    // }

    return (
        <div>
            {children?.length !== 0 && totalMoney !== 0 &&
                <>
                    <CanvasJSChart options={pieChartOptions} />
                    {/* <CanvasJSChart options={barChartOptions} /> */}
                </>
            }
        </div>
    );
}

export default Chart;