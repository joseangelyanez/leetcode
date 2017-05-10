public class Solution {
    public int FirstMissingPositive(int[] nums) {
        Dictionary<int, bool> m = new Dictionary<int, bool>();
        int max = 0;
        
        foreach(var n in nums)
        {
            if (max < n)
                max = n;
                
            m[n] = true;
        }
        
        for(int i = 1; i < max; i++)
        {
            if (!m.ContainsKey(i))
                return i;
        }
        
        return max + 1;
    }
}