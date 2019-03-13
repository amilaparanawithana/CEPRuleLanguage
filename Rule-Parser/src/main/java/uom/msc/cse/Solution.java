package uom.msc.cse;

import java.util.Arrays;

public class Solution {

    static int levels = 0;


    public static void main(String[] args) {


       new Solution().math(81);
        System.out.println(levels);
    }

    public int solution(int a, int b) {



return 0;



    }


    public boolean hasSquareRoot (int a, int b) {



        int cnt = 0; // Initialize result

        // Traverse through all numbers
        for (int i = a; i <= b; i++)

            // Check if current number 'i' is perfect
            // square
            for (int j = 1; j * j <= i; j++)
                if (j * j == i)
                    cnt++;


                if(cnt > 0) {
                    return true;
                } else {
                    return false;
                }
    }


    public void math (int a) {

        double sr = Math.sqrt(a);

        // If square root is an integer
        if(((sr - Math.floor(sr)) == 0)) {
            levels = levels + 1;
            math((int)sr);
        }

    }
}
