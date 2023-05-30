using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class HouseGroupHub:Hub
    {
        public static List<string> GroupsJoined { get; set; } = new List<string>();

        public async Task JoinHouse(string houseName)
        {
            if (!GroupsJoined.Contains(Context.ConnectionId + ":" + houseName))
            {
                GroupsJoined.Add(Context.ConnectionId + ":" + houseName);
                
                //do something else
                //Here to get a list of all subscribed house name, and display on the top
                string houseList = "";
                foreach (var str in GroupsJoined)
                {
                    if (str.Contains(Context.ConnectionId))
                    {
                        houseList += str.Split(':')[1] + " ";
                    }
                }

                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName.ToLower(), true);
                // Groups here is a 'group manager'
                await Groups.AddToGroupAsync(Context.ConnectionId, houseName);
            }
        }

        public async Task LeaveHouse(string houseName)
        {
            if (GroupsJoined.Contains(Context.ConnectionId + ":" + houseName))
            {
                GroupsJoined.Remove(Context.ConnectionId + ":" + houseName);

                //do something else

                string houseList = "";
                foreach (var str in GroupsJoined)
                {
                    if (str.Contains(Context.ConnectionId))
                    {
                        houseList += str.Split(':')[1] + " ";
                    }
                }

                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName.ToLower(), false);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, houseName);
            }
        }
    }
}
