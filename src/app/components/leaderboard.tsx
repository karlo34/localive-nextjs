import { useState, useEffect } from "react";
interface LeaderboardProps {
    email: string;
}
interface User {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: string;
    status: string;
    location_id: number | null;
    created_at: string;
    city: string;
    country: string;
    gender: string;
    birthday: string;
    points: number;
}
const Leaderboard = ({ email }: LeaderboardProps) => {
    console.log("user " + email);

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);

    const currentUserEmail = email.trim().toLowerCase();

    const top5Users = users.slice(0, 5);

    const currentUserIndex = users.findIndex(
        (u) => u.email.trim().toLowerCase() === currentUserEmail
    );

    const currentUserNotInTop5 = currentUserIndex >= 5;
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch("api/users");
                const data = await res.json();
                const sortedUsers = data.sort((a: User, b: User) => b.points - a.points);
                console.log(sortedUsers);
                setUsers(sortedUsers);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    return (
        <div className="flex-grow flex flex-row flex-wrap gap-4 justify-center">
            <div className="bg-white p-4 rounded-lg shadow w-80" style={{ height: '400px' }}>
                <h4 className="text-xl font-semibold mb-2">Bedževi</h4>
                <div
                    className="overflow-y-auto"
                    style={{ height: 'calc(100% - 1.5rem)' }}
                >
                    {/* Add enough content here to overflow */}
                    <ul className="flex flex-wrap gap-4 mb-10">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                        <li>11</li>
                        <li>12</li>
                        <li>13</li>
                        <li>14</li>
                        <li>15</li>
                        <li>16</li>
                        <li>17</li>
                        <li>18</li>
                        <li>19</li>
                        <li>20</li>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                        <li>11</li>
                        <li>12</li>
                        <li>13</li>
                        <li>14</li>
                        <li>15</li>
                        <li>16</li>
                        <li>17</li>
                        <li>18</li>
                        <li>19</li>
                        <li>20</li>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                        <li>11</li>
                        <li>12</li>
                        <li>13</li>
                        <li>14</li>
                        <li>15</li>
                        <li>16</li>
                        <li>17</li>
                        <li>18</li>
                        <li>19</li>
                        <li>20</li>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                        <li>11</li>
                        <li>12</li>
                        <li>13</li>
                        <li>14</li>
                        <li>15</li>
                        <li>16</li>
                        <li>17</li>
                        <li>18</li>
                        <li>19</li>
                        <li>20</li>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                        <li>11</li>
                        <li>12</li>
                        <li>13</li>
                        <li>14</li>
                        <li>15</li>
                        <li>16</li>
                        <li>17</li>
                        <li>18</li>
                        <li>19</li>
                        <li>20</li>
                    </ul>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow w-full lg:w-1/2 overflow-auto max-h-[500px]">
                <h1 className="font-semibold mb-2 text-xl">Bodovna ljestvica</h1>
                <table>
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="text-right w-6 px-3 py-2">Mjesto</th>
                            <th className="w-1/5 px-3 py-2">Ime</th>
                            <th className="w-1/5 px-3 py-2">Bodovi</th>
                            <th className="w-1/6 px-3 py-2">Grad</th>
                            <th className="w-1/5 px-3 py-2">Datum rođenja</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            top5Users ? (
                                <>
                                    {top5Users.map((user, i) => (
                                        <tr
                                            key={user.id}
                                            className={`shadow rounded-lg ${user.email.trim().toLowerCase() === currentUserEmail
                                                ? "bg-blue-500 text-white"
                                                : "bg-white text-black"
                                                }`}
                                        >
                                            <td className="text-center w-6 px-3 py-2">{i + 1}.</td>
                                            <td className="text-center w-1/5 px-3 py-2">{user.name}</td>
                                            <td className="text-center w-1/5 px-3 py-2">{user.points}</td>
                                            <td className="text-center w-1/6 px-3 py-2">{user.city}</td>
                                            <td className="text-center w-1/5 px-3 py-2">
                                                {new Intl.DateTimeFormat("en-GB").format(new Date(user.birthday))}
                                            </td>
                                        </tr>
                                    ))}

                                    {currentUserNotInTop5 && currentUserIndex !== -1 && (
                                        <>
                                            <tr
                                                key={users[currentUserIndex].id}
                                                className="shadow rounded-lg bg-blue-500 text-white"
                                            >
                                                <td className="text-center w-6 px-3 py-2">{currentUserIndex + 1}.</td>
                                                <td className="text-center w-1/5 px-3 py-2">{users[currentUserIndex].name}</td>
                                                <td className="text-center w-1/5 px-3 py-2">{users[currentUserIndex].points}</td>
                                                <td className="text-center w-1/6 px-3 py-2">{users[currentUserIndex].city}</td>
                                                <td className="text-center w-1/5 px-3 py-2">
                                                    {new Intl.DateTimeFormat("en-GB").format(
                                                        new Date(users[currentUserIndex].birthday)
                                                    )}
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </>
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-2">Loading data ...</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Leaderboard;