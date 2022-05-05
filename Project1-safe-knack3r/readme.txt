Andreas Schwörer Matr. 763833 SWB4	MCI2	Projekt 1 - Touch Spiel Implementierung

Installationshinweis:
Das gesamte Spiel "Safe-Knack3r" kann ohne Installation gespielt werden. Benötigt wird nur ein Browser. Erfolgreich getestet wurde es mit Edge und Firefox.

Gebrauchshinweis:
Ich empfehle das Spiel mit einem Tablet zu spielen. Im vollen Umfang getestet wurde es nur auf meinem Notebook mit einer Auflösung von 1920x1080 und touchfähigem Bildschirm. Das Spiel wurde nicht mit einem kleineren Bildschirm getestet und könnte bei kleineren Displays Darstellungsfehler enthalten.
Das Spiel hat Tutorial Nachrichten. Wo keine sind sollten auch keine nötig sein.

Konzept/Realität:
Im Konzept war die Idee, das Rad in beliebige Richtungen drehen zu können. Durch Schwierigkeiten bei der Implementierung musste ich vom Konzept abweichen. Die Grundidee ist da, aber insgesamt weicht die Steuerung geringfügig ab.
- Im Rad gibt es einen rot markierten Bereich der unter bestimmten Bedingungen zu Fehlern führt, wenn der Nutzer mit dem Finger über den roten Bereich kommt.
Vor dem Fehler wird über das Tutorial als Hinweis gewarnt.

Anpassung:
Die maximale Länge des zu erratenden Codes ist per default auf 8 gesetzt. Im Quellcode kann dieser am Anfang des Codes unter "maxLvl" angepasst werden. Ich empfehle diesen nicht höher als 10 zu setzen, da bereits nach zwei Level schlechtere Performance zu beobachten ist. Dieses Problem konnte ich leider noch nicht beheben. Dennoch ist es laut meinen Tests im letzten Level immernoch relativ gut spielbar.