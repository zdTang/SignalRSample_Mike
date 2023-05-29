namespace SignalRSample.Hubs
{
    public class DeathlyHallowsHub
    {
        public Dictionary<string, int> GetRaceStatus()
        {
            return SD.DealthyHallowRace;
        }
    }
}
