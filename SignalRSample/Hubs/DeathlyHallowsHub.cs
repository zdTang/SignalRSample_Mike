using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class DeathlyHallowsHub:Hub
    {
        public Dictionary<string, int> GetRaceStatus()
        {
            return SD.DealthyHallowRace;
        }


        // This will update New caller's view
        public async Task NewWindowLoaded()
        {

            await Clients.Caller.SendAsync("updateDealthyHallowCount",
                                        SD.DealthyHallowRace[SD.Cloak],
                                        SD.DealthyHallowRace[SD.Stone],
                                        SD.DealthyHallowRace[SD.Wand]); 
        }
    }
}
