import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mountain, 
  Waves, 
  Castle, 
  Tent, 
  Plane, 
  MapPin, 
  Camera, 
  Utensils,
  Hotel
} from 'lucide-react';

interface Activity {
  time: string;
  name: string;
  location: string;
  budget_estimated: number;
  notes: string;
  is_event: boolean;
  event_link: string;
}

interface Day {
  day: number;
  date: string;
  title: string;
  activities: Activity[];
  daily_budget_total: number;
}

interface TravelTimelineProps {
  days: Day[];
}

const getActivityIcon = (activity: Activity) => {
  const name = activity.name.toLowerCase();
  
  if (name.includes('hiking') || name.includes('randonnée')) return <Mountain className="w-6 h-6" />;
  if (name.includes('beach') || name.includes('plage')) return <Waves className="w-6 h-6" />;
  if (name.includes('castle') || name.includes('château')) return <Castle className="w-6 h-6" />;
  if (name.includes('mountain') || name.includes('montagne')) return <Mountain className="w-6 h-6" />;
  if (name.includes('camping') || name.includes('tente')) return <Tent className="w-6 h-6" />;
  if (name.includes('airport') || name.includes('aéroport')) return <Plane className="w-6 h-6" />;
  if (name.includes('restaurant') || name.includes('dîner')) return <Utensils className="w-6 h-6" />;
  if (name.includes('hotel') || name.includes('hébergement')) return <Hotel className="w-6 h-6" />;
  if (name.includes('photo') || name.includes('vue')) return <Camera className="w-6 h-6" />;
  
  return <MapPin className="w-6 h-6" />;
};

const TravelTimeline: React.FC<TravelTimelineProps> = ({ days }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [visibleDays, setVisibleDays] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleDays(prev => Math.min(prev + 1, days.length));
    }, 500);

    return () => clearInterval(timer);
  }, [days.length]);

  return (
    <div className="relative">
      {/* Timeline path */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-blue to-ice-blue rounded-full" />
      
      <div className="space-y-12">
        {days.slice(0, visibleDays).map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-16"
          >
            {/* Day marker */}
            <div className="absolute left-4 top-0 w-8 h-8 rounded-full bg-neon-blue flex items-center justify-center text-white font-bold">
              {day.day}
            </div>

            {/* Day content */}
            <motion.div
              className="bg-black/20 rounded-lg p-6 cursor-pointer hover:bg-black/30 transition-colors"
              onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl text-white font-medium mb-4">{day.title}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-ice-blue mb-2">
                    <span className="text-white font-medium">Date:</span> {day.date}
                  </p>
                  <p className="text-ice-blue mb-2">
                    <span className="text-white font-medium">Budget:</span> €{day.daily_budget_total}
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {selectedDay === day.day && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="space-y-4">
                      {day.activities.map((activity, activityIndex) => (
                        <motion.div
                          key={activityIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: activityIndex * 0.1 }}
                          className="flex items-start gap-4 p-4 bg-black/30 rounded-lg"
                        >
                          <div className="text-neon-blue">
                            {getActivityIcon(activity)}
                          </div>
                          <div>
                            <p className="text-sm text-neon-blue">{activity.time}</p>
                            <p className="text-white font-medium">{activity.name}</p>
                            <p className="text-sm text-ice-blue/70">{activity.location}</p>
                            <p className="text-sm text-ice-blue/50 mt-1">{activity.notes}</p>
                            {activity.is_event && activity.event_link && (
                              <a
                                href={activity.event_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-neon-blue hover:underline mt-2 inline-block"
                              >
                                View Event
                              </a>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TravelTimeline; 