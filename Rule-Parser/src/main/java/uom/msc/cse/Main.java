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
        String xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n" +
                "<query>\n" +
                "    <select>\n" +
                "        <attributes>\n" +
                "            <attribute as=\"attr1o\">atr1</attribute>\n" +
                "            <attribute as=\"attr2o\" type=\"DEFAULT\">atr2</attribute>\n" +
                "        </attributes>\n" +
                "        <!--<operators>\n" +
                "            <operator connectWith=\"AND\">oper1</operator>\n" +
                "        </operators>-->\n" +
                "    </select>\n" +
                "    <fromStream>samplefromstream</fromStream>\n" +
                "    <group-by>grp1</group-by>\n" +
                "    <filter>\n" +
                "        <having>having1</having>\n" +
                "        <conditions>\n" +
                "            <condition>con1</condition>\n" +
                "            <condition connect=\"AND\">con2</condition>\n" +
                "        </conditions>\n" +
                "    </filter>\n" +
                "    <insertInto>insert-stream</insertInto>\n" +
                "</query>";
//        System.out.println(Parser.getSiddiConverter().XMLToSiddhiQL(xmlFile));
        System.out.println(Parser.getSiddiConverter().XMLToSiddhiQL(xml));
        System.out.println(Parser.getEsperConverter().XMLToEsper(xmlFile));

    }
}
