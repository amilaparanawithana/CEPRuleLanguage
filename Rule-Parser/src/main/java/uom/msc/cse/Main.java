package uom.msc.cse;

import uom.msc.cse.impl.Parser;

import java.io.File;

/**
 * @author Amila Paranawithana
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("--------- converter running ------------");
        File xmlFile = new File("sample.xml");

        /*String eplQuery = "insert into CombinedEvent\n" +
                "select A.customerId as custId, A.timestamp - B.timestamp as latency\n" +
                "  from EventA.win:time(30 min) A, EventB.win:time(30 min) B\n" +
                " where A.txnId = B.txnId;";*/


        String siddhiQuery = "from TempStream[temp > 30.0]#window.time(1 min) as T\n" +
                "  join RegulatorStream[isOn == false]#window.length(1) as R\n" +
                "  on T.roomNo == R.roomNo\n" +
                "select T.roomNo, R.deviceID, 'start' as action\n" +
                "insert into RegulatorActionStream;";


        // --------------Siddhi -----------------
        System.out.println(Parser.getSiddiConverter().XMLToSiddhiQL(xmlFile));
//        System.out.println(Parser.getSiddiConverter().SiddhiQLToXML(siddhiQuery));
//        System.out.println(Parser.getSiddiConverter().SiddhiQLToXML("from TempStream[temp > 30.0]#window.time(1 min) as T\n" +
//                "  join RegulatorStream[isOn == false]#window.length(1) as R\n" +
//                "  on T.roomNo == R.roomNo\n" +
//                "select T.roomNo, R.deviceID, 'start' as action\n" +
//                "insert into RegulatorActionStream;" ));

        // ------------ ESPER --------------------

        String eplQuery = "select 'IBM stats' as title, avg(price) as avgPrice, sum(price) as sumPrice\n" +
                "from StockTickEvent(symbol='IBM').win:length(10)\n" +
                "where symbol='IBM';";
//        System.out.println(Parser.getEsperConverter().EPLToXML(eplQuery));
//        System.out.println(Parser.getEsperConverter().XMLToEPL(xmlFile));



        // ____________ CQL -----------------------

        String cqlQuery = "Select segNo, dir, hwy\n" +
                "   From SegSpeedStr [Range 5 Minutes]\n" +
                "   Group By segNo, dir, hwy\n" +
                "   Having Avg(speed) < 40;";
//        xml to cql
//        System.out.println(Parser.getStreamConverter().XMLToCQL(xmlFile));
//        System.out.println(Parser.getStreamConverter().CQLToXML(cqlQuery));



    }
}
