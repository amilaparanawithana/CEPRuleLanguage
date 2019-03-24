package uom.msc.cse;

import uom.msc.cse.impl.Parser;

import java.io.File;

/**
 * @author Amila Paranawithana
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("--------- converter running ------------");
        File xmlFile = new File("sample1.xml");

        /*String eplQuery = "insert into CombinedEvent\n" +
                "select A.customerId as custId, A.timestamp - B.timestamp as latency\n" +
                "  from EventA.win:time(30 min) A, EventB.win:time(30 min) B\n" +
                " where A.txnId = B.txnId;";*/


        String siddhiQuery = "from temp_stream#window.time(10 min)  as tmps join traffic_stream as traffic  on tmps.locId = traffic.locId select roomNo as rn , deviceID , avg(temperature) as avgTemp group by deviceID having deviceID = 2001;";


        // --------------Siddhi -----------------
//        System.out.println(Parser.getSiddiConverter().XMLToSiddhiQL(xmlFile));
        System.out.println(Parser.getSiddiConverter().SiddhiQLToXML(siddhiQuery));
//        System.out.println(Parser.getSiddiConverter().SiddhiQLToXML("from TempStream[temp > 30.0]#window.time(1 min) as T\n" +
//                "  join RegulatorStream[isOn == false]#window.length(1) as R\n" +
//                "  on T.roomNo == R.roomNo\n" +
//                "select T.roomNo, R.deviceID, 'start' as action\n" +
//                "insert into RegulatorActionStream;" ));

        // ------------ ESPER --------------------

//        String eplQuery = "select roomNo as rn , deviceID , avg(temperature) as avgTemp from temp_stream.win:time(10 min) as tmps,traffic_stream as traffic  where tmps.locId = traffic.locId group by deviceID having deviceID = 2001;";
//        System.out.println(Parser.getEsperConverter().EPLToXML(eplQuery));
//        System.out.println(Parser.getEsperConverter().XMLToEPL(xmlFile));



        // ____________ CQL -----------------------

        String cqlQuery = "select segNo, dir, hwy from SegSpeedStr[Range 5 Minutes] group by segNo, dir, hwy Having avg(speed) < 40;";
//        xml to cql
//        System.out.println(Parser.getStreamConverter().XMLToCQL(xmlFile));
//        System.out.println(Parser.getStreamConverter().CQLToXML(cqlQuery));



    }
}
